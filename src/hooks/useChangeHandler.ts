import { ChangeEvent, useMemo } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { ValuesFields } from '../types/ValuesFields';
import { UseFieldValueArg, UseFieldValueReturn } from './useFieldValue';
import useEventCallback from 'use-event-callback';

export interface UseChangeHandlerArg<Name> {
  name: Name;
}

export interface UseChangeHandlerReturn<Values, Name extends ValuesFields<Values>> {
  changeValue: (newValue: DeepIndex<Values, Name>) => void;
  handleChangeEvent: DeepIndex<Values, Name> extends string
    ? ((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void)
    : never;
  handleCheckboxEvent: DeepIndex<Values, Name> extends boolean
    ? ((event: ChangeEvent<HTMLInputElement>) => void)
    : never;
}

export interface CreateUseChangeHandlerDependencies<Values> {
  useFieldValue: <Name extends ValuesFields<Values>>(arg: UseFieldValueArg<Name>) => UseFieldValueReturn<Values, Name>;
}

export const createUseChangeHandler = <Values>({ useFieldValue }: CreateUseChangeHandlerDependencies<Values>) => {
  const useChangeHandler = <Name extends ValuesFields<Values>>({ name }: UseChangeHandlerArg<Name>): UseChangeHandlerReturn<Values, Name> => {
    const { changeValue } = useFieldValue<Name>({ name });

    const handleChangeEvent: any = useEventCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { value } = event.target || event.currentTarget;

      changeValue(value as any);
    });

    const handleCheckboxEvent: any = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target || event.currentTarget;

      changeValue(checked as any);
    });

    return useMemo(() => ({
      changeValue,
      handleChangeEvent,
      handleCheckboxEvent,
    }), [
      changeValue,
      handleChangeEvent,
      handleCheckboxEvent,
    ]);
  };

  return useChangeHandler;
};