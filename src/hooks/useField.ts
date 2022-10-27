import { useEffect, useState } from 'react';
import { O } from 'ts-toolbelt';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextReturn } from './useMainContext';
import get from 'lodash.get';
import { EVENT_VALUES_CHANGE } from '../constants/events';

export interface UseFieldArg<Name> {
  name: Name;
}

export interface UseFieldReturn<Values> {
}

export interface CreateUseFieldDependencies<Values> {
  useMainContext: () => UseMainContextReturn<Values>;
}

export const createUseField = <Values>({ useMainContext }: CreateUseFieldDependencies<Values>) => {
  const useField = <Name extends string & O.Paths<Values>>({ name }: UseFieldArg<Name>): UseFieldReturn<Values> => {
    const { events, values } = useMainContext();
    const [value, setValue] = useState<DeepIndex<Values, Name>>(get(values, name));

    useEffect(() => {
      const handleChange = (newValues: Values) => {
        const newValue = get(newValues, name);

        if (values !== newValue) {
          setValue(newValue);
        }
      };

      events.on(EVENT_VALUES_CHANGE, handleChange);

      return () => {
        events.off(EVENT_VALUES_CHANGE, handleChange);
      }
    }, [events, values, name, setValue]);

    return {
      value,
    };
  };

  return useField;
};
