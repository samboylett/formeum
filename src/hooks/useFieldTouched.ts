import { useEffect, useMemo, useState } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextArg, UseMainContextReturn } from './useMainContext';
import { get, isEqual } from 'lodash';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';

export interface UseFieldTouchedArg<Name> {
  name: Name;
}

export interface UseFieldTouchedReturn {
  isTouched: boolean;
  setIsTouched: (nextIsTouched: boolean) => void;
}

export interface CreateUseFieldTouchedDependencies<Values> {
  useMainContext: (arg: UseMainContextArg<Values>) => UseMainContextReturn<Values>;
}

export const createUseFieldTouched = <Values>({ useMainContext }: CreateUseFieldTouchedDependencies<Values>) => {
  const useFieldTouched = <Name extends ValuesFields<Values>>({ name }: UseFieldTouchedArg<Name>): UseFieldTouchedReturn => {
    const { touched, setFieldTouched } = useMainContext({
      shouldUpdate: (oldValue, newValue) => {
        return oldValue.touched.has(name) !== newValue.touched.has(name);
      }
    });

    const setIsTouched = useEventCallback((nextIsTouched: boolean) => {
      setFieldTouched(name, nextIsTouched);
    });

    const isTouched = useMemo(() => touched.has(name), [touched, name]);

    return useMemo(() => ({
      isTouched,
      setIsTouched,
    }), [
      isTouched,
      setIsTouched,
    ]);
  };

  return useFieldTouched;
};
