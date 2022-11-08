import { useMemo } from 'react';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';
import { UseFieldTouchedArg, UseFieldTouchedReturn } from './useFieldTouched';
import { UseCurrentContextReturn } from './useCurrentContext';
import { UseFieldArg, UseFieldReturn } from './useField';
import { UseFieldBlurArg, UseFieldBlurReturn } from './useFieldBlur';
import { UseFieldFocusArg, UseFieldFocusReturn } from './useFieldFocus';
import { UseChangeHandlerArg, UseChangeHandlerReturn } from './useChangeHandler';
import { UseFieldValueArg, UseFieldValueReturn } from './useFieldValue';

export interface UseHTMLInputArg<Name> {
    name: Name;
}

export interface UseHTMLInputReturn<Values, Name extends ValuesFields<Values>> extends UseFieldBlurReturn, UseFieldFocusReturn {
    name: Name;
    value: string;
    onChange: UseChangeHandlerReturn<Values, Name>['handleChangeEvent'];
}

export interface CreateUseFieldFocusDependencies<Values> {
    useFieldValue: <Name extends ValuesFields<Values>>(arg: UseFieldValueArg<Name>) => UseFieldValueReturn<Values, Name>;
    useFieldFocus: <Name extends ValuesFields<Values>>(arg: UseFieldFocusArg<Name>) => UseFieldFocusReturn;
    useFieldBlur: <Name extends ValuesFields<Values>>(arg: UseFieldBlurArg<Name>) => UseFieldBlurReturn;
    useChangeHandler: <Name extends ValuesFields<Values>>(arg: UseChangeHandlerArg<Name>) => UseChangeHandlerReturn<Values, Name>;
}

export const createUseHTMLInput = <Values>({ useFieldValue, useFieldFocus, useFieldBlur, useChangeHandler }: CreateUseFieldFocusDependencies<Values>) => {
    const useHTMLInput = <Name extends ValuesFields<Values>>({ name }: UseHTMLInputArg<Name>): UseHTMLInputReturn<Values, Name> => {
        const { value: baseValue } = useFieldValue<Name>({ name });
        const { onFocus } = useFieldFocus<Name>({ name });
        const { onBlur } = useFieldBlur<Name>({ name });
        const { handleChangeEvent } = useChangeHandler<Name>({ name });

        const value = `${baseValue}`;

        return useMemo(() => ({
            name,
            value,
            onBlur,
            onFocus,
            onChange: handleChangeEvent,
        }), [
            name,
            value,
            onBlur,
            onFocus,
            handleChangeEvent,
        ]);
    };

    return useHTMLInput;
};
