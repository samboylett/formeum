import { useEffect, useMemo, useState } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextArg, UseMainContextReturn } from './useMainContext';
import { get, isEqual } from 'lodash';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';
import { UseFieldTouchedArg, UseFieldTouchedReturn } from './useFieldTouched';
import { UseCurrentContextReturn } from './useCurrentContext';


export interface UseFieldValueArg<Name> {
  name: Name;
}

export interface UseFieldValueReturn<Values, Name extends ValuesFields<Values>> {
  value: DeepIndex<Values, Name>;
  initialValue: DeepIndex<Values, Name>;
  changeValue: (newValue: DeepIndex<Values, Name>) => void;
  hasChanged: boolean;
}

export interface CreateUseFieldValueDependencies<Values> {
  useMainContext: (arg: UseMainContextArg<Values>) => UseMainContextReturn<Values>;
  useCurrentContext: () => UseCurrentContextReturn<Values>;
  useFieldTouched: <Name extends ValuesFields<Values>>(arg: UseFieldTouchedArg<Name>) => UseFieldTouchedReturn;
}

export const createUseFieldValue = <Values>({ useMainContext, useFieldTouched, useCurrentContext }: CreateUseFieldValueDependencies<Values>) => {
  /**
   * Logic around a fields value. Handles getting the field value out of the main context, the initial value, changing the value and if the value has changed.
   * 
   * @param {UseFieldValueArg<Name>} arg 
   * @returns {UseFieldValueReturn<Values, Name>}
   */
  const useFieldValue = <Name extends ValuesFields<Values>>({ name }: UseFieldValueArg<Name>): UseFieldValueReturn<Values, Name> => {
    const contextRef = useCurrentContext();
    const { values, initialValues, setFieldValue } = useMainContext({
      shouldUpdate: (oldValue, newValue) => {
        return (['values', 'initialValues'] as const).some(v => !isEqual(get(oldValue[v], name), get(newValue[v], name)));
      }
    });

    const { isTouched, setIsTouched } = useFieldTouched<Name>({ name });

    const value = useMemo(() => get(values, name), [values, name]);
    const initialValue = useMemo(() => get(initialValues, name), [initialValues, name]);

    const changeValue = useEventCallback((newValue: DeepIndex<Values, Name>) => {
      setFieldValue(name, newValue);

      if (!isTouched && contextRef.current.touchOnChange) setIsTouched(true);
    });

    const hasChanged = useMemo(() => !isEqual(value, initialValue), [value, initialValue]);

    return useMemo(() => ({
      value,
      changeValue,
      initialValue,
      hasChanged,
    }), [
      value,
      changeValue,
      initialValue,
      hasChanged,
    ]);
  };

  return useFieldValue;
};
