import { useEffect, useMemo, useState } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextReturn } from './useMainContext';
import { get } from 'lodash';
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
  useMainContext: () => UseMainContextReturn<Values>;
}

export const createUseFieldValue = <Values>({ useMainContext }: CreateUseFieldValueDependencies<Values>) => {
  const useFieldValue = <Name extends ValuesFields<Values>>({ name }: UseFieldValueArg<Name>): UseFieldValueReturn<Values, Name> => {
    const { events, values, setFieldValue } = useMainContext();
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
