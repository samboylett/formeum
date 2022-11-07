import { useEffect, useMemo, useState } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextArg, UseMainContextReturn } from './useMainContext';
import { get, isEqual } from 'lodash';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';
import { UseFieldTouchedArg, UseFieldTouchedReturn } from './useFieldTouched';


export interface UseFieldValueArg<Name> {
  name: Name;
}

export interface UseFieldValueReturn<Values, Name extends ValuesFields<Values>> {
  value: DeepIndex<Values, Name>;
  changeValue: (newValue: DeepIndex<Values, Name>) => void;
}

export interface CreateUseFieldValueDependencies<Values> {
  useMainContext: (arg: UseMainContextArg<Values>) => UseMainContextReturn<Values>;
  useFieldTouched: <Name extends ValuesFields<Values>>(arg: UseFieldTouchedArg<Name>) => UseFieldTouchedReturn;
}

export const createUseFieldValue = <Values>({ useMainContext, useFieldTouched }: CreateUseFieldValueDependencies<Values>) => {
  const useFieldValue = <Name extends ValuesFields<Values>>({ name }: UseFieldValueArg<Name>): UseFieldValueReturn<Values, Name> => {
    const { values, setFieldValue } = useMainContext({
      shouldUpdate: (oldValue, newValue) => {
        return !isEqual(get(oldValue.values, name), get(newValue.values, name));
      }
    });

    const { isTouched, setIsTouched } = useFieldTouched<Name>({ name });

    const value = useMemo(() => get(values, name), [values, name]);

    const changeValue = useEventCallback((newValue: DeepIndex<Values, Name>) => {
      setFieldValue(name, newValue);

      if (!isTouched) setIsTouched(true);
    });

    return useMemo(() => ({
      value,
      changeValue,
    }), [
      value,
      changeValue,
    ]);
  };

  return useFieldValue;
};
