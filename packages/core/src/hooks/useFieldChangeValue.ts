import { useEffect, useMemo, useState } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextArg, UseMainContextReturn } from './useMainContext';
import { get, isEqual } from 'lodash';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';
import { UseFieldTouchedArg, UseFieldTouchedReturn } from './useFieldTouched';
import { UseCurrentContextReturn } from './useCurrentContext';


export interface UseFieldChangeValueArg<Name> {
  name: Name;
}

export interface UseFieldChangeValueReturn<Values, Name extends ValuesFields<Values>> {
  /**
   * Change the fields value.
   * 
   * @param {DeepIndex<Values, Name>} newValue
   */
  changeValue: (newValue: DeepIndex<Values, Name>) => void;
}

export interface CreateUseFieldChangeValueDependencies<Values> {
  useCurrentContext: () => UseCurrentContextReturn<Values>;
  useFieldTouched: <Name extends ValuesFields<Values>>(arg: UseFieldTouchedArg<Name>) => UseFieldTouchedReturn;
}

export const createUseFieldChangeValue = <Values>({ useFieldTouched, useCurrentContext }: CreateUseFieldChangeValueDependencies<Values>) => {
  /**
   * Logic around changing fields value.
   * 
   * @param {UseFieldChangeValueArg<Name>} arg 
   * @returns {UseFieldChangeValueReturn<Values, Name>}
   */
  const useFieldChangeValue = <Name extends ValuesFields<Values>>({ name }: UseFieldChangeValueArg<Name>): UseFieldChangeValueReturn<Values, Name> => {
    const contextRef = useCurrentContext();
    const { isTouched, setIsTouched } = useFieldTouched<Name>({ name });

    const changeValue = useEventCallback((newValue: DeepIndex<Values, Name>) => {
        contextRef.current.setFieldValue(name, newValue);

      if (!isTouched && contextRef.current.touchOnChange) setIsTouched(true);
    });

    return useMemo(() => ({
      changeValue,
    }), [
      changeValue,
    ]);
  };

  return useFieldChangeValue;
};
