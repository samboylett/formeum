import { useEffect, useMemo, useState } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextArg, UseMainContextReturn } from './useMainContext';
import { get, isEqual } from 'lodash';
import { EVENT_VALUES_CHANGE } from '../constants/events';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';


export interface UseFieldValueArg<Name> {
  name: Name;
}

export interface UseFieldValueReturn<Values, Name extends ValuesFields<Values>> {
  value: DeepIndex<Values, Name>;
  changeValue: (newValue: DeepIndex<Values, Name>) => void;
}

export interface CreateUseFieldValueDependencies<Values> {
  useMainContext: (arg: UseMainContextArg<Values>) => UseMainContextReturn<Values>;
}

export const createUseFieldValue = <Values>({ useMainContext }: CreateUseFieldValueDependencies<Values>) => {
  const useFieldValue = <Name extends ValuesFields<Values>>({ name }: UseFieldValueArg<Name>): UseFieldValueReturn<Values, Name> => {
    const { values, setFieldValue } = useMainContext({
      shouldUpdate: (oldValue, newValue) => {
        return !isEqual(get(oldValue.values, name), get(newValue.values, name));
      }
    });

    const value = useMemo(() => get(values, name), [values, name]);

    const changeValue = useEventCallback((newValue: DeepIndex<Values, Name>) => {
      setFieldValue(name, newValue);
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
