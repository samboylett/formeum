import { useMemo } from 'react';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';
import { UseFieldTouchedArg, UseFieldTouchedReturn } from './useFieldTouched';
import { UseCurrentContextReturn } from './useCurrentContext';

export interface UseFieldFocusArg<Name> {
    name: Name;
}

export interface UseFieldFocusReturn {
    onFocus: () => void;
}

export interface CreateUseFieldFocusDependencies<Values> {
    useFieldTouched: <Name extends ValuesFields<Values>>(arg: UseFieldTouchedArg<Name>) => UseFieldTouchedReturn;
    useCurrentContext: () => UseCurrentContextReturn<Values>;
}

export const createUseFieldFocus = <Values>({ useFieldTouched, useCurrentContext }: CreateUseFieldFocusDependencies<Values>) => {
    const useFieldFocus = <Name extends ValuesFields<Values>>({ name }: UseFieldTouchedArg<Name>): UseFieldFocusReturn => {
        const { setIsTouched } = useFieldTouched<Name>({ name });
        const contextRef = useCurrentContext();

        const onFocus = useEventCallback(() => {
            if (contextRef.current.touchOnFocus) {
                setIsTouched(true);
            }
        });

        return useMemo(() => ({
            onFocus,
        }), [
            onFocus,
        ]);
    };

    return useFieldFocus;
};
