import { useMemo } from 'react';
import { ValuesFields } from '../types/ValuesFields';
import { UseFieldBlurArg, UseFieldBlurReturn } from './useFieldBlur';
import { UseFieldFocusArg, UseFieldFocusReturn } from './useFieldFocus';
import { UseChangeHandlerArg, UseChangeHandlerReturn } from './useChangeHandler';
import { UseFieldValueArg, UseFieldValueReturn } from './useFieldValue';

export interface UseReactInputArg<Name> {
    name: Name;
}

export interface UseReactInputReturn<Values, Name extends ValuesFields<Values>> extends UseFieldBlurReturn, UseFieldFocusReturn {
    name: Name;
    value: string;
    onChange: UseChangeHandlerReturn<Values, Name>['changeValue'];
}

export interface CreateUseFieldFocusDependencies<Values> {
    useFieldValue: <Name extends ValuesFields<Values>>(arg: UseFieldValueArg<Name>) => UseFieldValueReturn<Values, Name>;
    useFieldFocus: <Name extends ValuesFields<Values>>(arg: UseFieldFocusArg<Name>) => UseFieldFocusReturn;
    useFieldBlur: <Name extends ValuesFields<Values>>(arg: UseFieldBlurArg<Name>) => UseFieldBlurReturn;
}

export const createUseReactInput = <Values>({ useFieldValue, useFieldFocus, useFieldBlur }: CreateUseFieldFocusDependencies<Values>) => {
    /**
     * Get the props to be used on a React style input, i.e. the change event should contain just the field value in the first argument rather than a change event.
     * 
     * @param {UseReactInputArg<Name>} 
     * @returns {UseReactInputReturn<Values, Name>}
     */
    const useReactInput = <Name extends ValuesFields<Values>>({ name }: UseReactInputArg<Name>): UseReactInputReturn<Values, Name> => {
        const { value: baseValue, changeValue } = useFieldValue<Name>({ name });
        const { onFocus } = useFieldFocus<Name>({ name });
        const { onBlur } = useFieldBlur<Name>({ name });

        const value = `${baseValue}`;

        return useMemo(() => ({
            name,
            value,
            onBlur,
            onFocus,
            onChange: changeValue,
        }), [
            name,
            value,
            onBlur,
            onFocus,
            changeValue,
        ]);
    };

    return useReactInput;
};