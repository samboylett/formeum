import { useMemo } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { ValuesFields } from '../types/ValuesFields';
import { UseFieldValueArg, UseFieldValueReturn } from './useFieldValue';
import { UseFieldErrorArg, UseFieldErrorReturn } from './useFieldError';


export interface UseFieldArg<Name> {
  name: Name;
}

export interface UseFieldReturn<Values, Name extends ValuesFields<Values>> {
  value: DeepIndex<Values, Name>;
  error: string | undefined;
  name: Name;
  changeValue: (newValue: DeepIndex<Values, Name>) => void;
  changeError: (error: string | undefined) => void;
}

export interface CreateUseFieldDependencies<Values> {
  useFieldValue: <Name extends ValuesFields<Values>>(arg: UseFieldValueArg<Name>) => UseFieldValueReturn<Values, Name>;
  useFieldError: <Name extends ValuesFields<Values>>(arg: UseFieldErrorArg<Name>) => UseFieldErrorReturn;
}

export const createUseField = <Values>({ useFieldValue, useFieldError }: CreateUseFieldDependencies<Values>) => {
  const useField = <Name extends ValuesFields<Values>>({ name }: UseFieldArg<Name>): UseFieldReturn<Values, Name> => {
    const { error, changeError } = useFieldError<Name>({ name });
    const { value, changeValue } = useFieldValue<Name>({ name });

    return useMemo(() => ({
      value,
      error,
      name,
      changeValue,
      changeError,
    }), [
      value,
      error,
      name,
      changeValue,
      changeError,
    ]);
  };

  return useField;
};
