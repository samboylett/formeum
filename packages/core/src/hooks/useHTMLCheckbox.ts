import { useMemo } from 'react';
import { ValuesFields } from '../types/ValuesFields';
import { UseFieldBlurArg, UseFieldBlurReturn } from './useFieldBlur';
import { UseFieldFocusArg, UseFieldFocusReturn } from './useFieldFocus';
import { UseChangeHandlerArg, UseChangeHandlerReturn } from './useChangeHandler';
import { UseFieldValueArg, UseFieldValueReturn } from './useFieldValue';
import { DeepIndex } from '../types/DeepIndex';

export interface UseHTMLCheckboxArg<Values, Name extends ValuesFields<Values>> {
    name: DeepIndex<Values, Name> extends boolean ? Name : never;
}

export interface UseHTMLCheckboxReturn<Values, Name extends ValuesFields<Values>> extends UseFieldBlurReturn, UseFieldFocusReturn {
    name: Name;
    value: string;
    onChange: UseChangeHandlerReturn<Values, Name>['handleCheckboxEvent'];
    type: "checkbox",
}

export interface CreateUseHTMLCheckboxDependencies<Values> {
    useFieldValue: <Name extends ValuesFields<Values>>(arg: UseFieldValueArg<Name>) => UseFieldValueReturn<Values, Name>;
    useFieldFocus: <Name extends ValuesFields<Values>>(arg: UseFieldFocusArg<Name>) => UseFieldFocusReturn;
    useFieldBlur: <Name extends ValuesFields<Values>>(arg: UseFieldBlurArg<Name>) => UseFieldBlurReturn;
    useChangeHandler: <Name extends ValuesFields<Values>>(arg: UseChangeHandlerArg<Name>) => UseChangeHandlerReturn<Values, Name>;
}

export const createUseHTMLCheckbox = <Values>({ useFieldValue, useFieldFocus, useFieldBlur, useChangeHandler }: CreateUseHTMLCheckboxDependencies<Values>) => {
    /**
     * Get the props to use for a native HTML checkbox input as a boolean value.
     * 
     * @param {UseHTMLCheckboxArg<Values, Name>} arg 
     * @returns {UseHTMLCheckboxReturn<Values, Name>}
     */
    const useHTMLCheckbox = <Name extends ValuesFields<Values>>({ name }: UseHTMLCheckboxArg<Values, Name>): UseHTMLCheckboxReturn<Values, Name> => {
        const { value: baseValue } = useFieldValue<Name>({ name });
        const { onFocus } = useFieldFocus<Name>({ name });
        const { onBlur } = useFieldBlur<Name>({ name });
        const { handleCheckboxEvent } = useChangeHandler<Name>({ name });

        const value = `${baseValue}`;

        return useMemo(() => ({
            name,
            value,
            onBlur,
            onFocus,
            onChange: handleCheckboxEvent,
            type: "checkbox"
        }), [
            name,
            value,
            onBlur,
            onFocus,
            handleCheckboxEvent,
        ]);
    };

    return useHTMLCheckbox;
};
