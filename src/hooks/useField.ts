import { useMemo } from 'react';
import { ValuesFields } from '../types/ValuesFields';
import { UseFieldValueArg, UseFieldValueReturn } from './useFieldValue';
import { UseFieldErrorArg, UseFieldErrorReturn } from './useFieldError';
import { UseChangeHandlerArg, UseChangeHandlerReturn } from './useChangeHandler';
import { UseFieldTouchedArg, UseFieldTouchedReturn } from './useFieldTouched';
import { UseFieldBlurArg, UseFieldBlurReturn } from './useFieldBlur';


export interface UseFieldArg<Name> {
  name: Name;
}

export interface UseFieldReturn<Values, Name extends ValuesFields<Values>> extends UseFieldValueReturn<Values, Name>, UseFieldErrorReturn, UseChangeHandlerReturn<Values, Name>, UseFieldBlurReturn {
  name: Name;
}

export interface CreateUseFieldDependencies<Values> {
  useFieldValue: <Name extends ValuesFields<Values>>(arg: UseFieldValueArg<Name>) => UseFieldValueReturn<Values, Name>;
  useFieldError: <Name extends ValuesFields<Values>>(arg: UseFieldErrorArg<Name>) => UseFieldErrorReturn;
  useFieldTouched: <Name extends ValuesFields<Values>>(arg: UseFieldTouchedArg<Name>) => UseFieldTouchedReturn;
  useChangeHandler: <Name extends ValuesFields<Values>>(arg: UseChangeHandlerArg<Name>) => UseChangeHandlerReturn<Values, Name>;
  useFieldBlur: <Name extends ValuesFields<Values>>(arg: UseFieldBlurArg<Name>) => UseFieldBlurReturn;
}

export const createUseField = <Values>({ useFieldValue, useFieldError, useChangeHandler, useFieldTouched, useFieldBlur }: CreateUseFieldDependencies<Values>) => {
  const useField = <Name extends ValuesFields<Values>>({ name }: UseFieldArg<Name>): UseFieldReturn<Values, Name> => {
    const fieldError = useFieldError<Name>({ name });
    const fieldValue = useFieldValue<Name>({ name });
    const fieldTouched = useFieldTouched<Name>({ name });
    const changeHandlers = useChangeHandler<Name>({ name });
    const blurHandlers = useFieldBlur<Name>({ name });

    return useMemo(() => ({
      name,
      ...fieldValue,
      ...fieldError,
      ...fieldTouched,
      ...changeHandlers,
      ...blurHandlers,
    }), [
      name,
      fieldValue,
      fieldError,
      fieldTouched,
      changeHandlers,
      blurHandlers,
    ]);
  };

  return useField;
};
