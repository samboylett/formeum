import { useEffect, useMemo, useState } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextReturn } from './useMainContext';
import { get } from 'lodash';
import { EVENT_ERRORS_CHANGE, EVENT_VALUES_CHANGE } from '../constants/events';
import { FormErrors } from '../types/FormErrors';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';
import { UseFieldValueArg, UseFieldValueReturn } from './useFieldValue';


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
  useMainContext: () => UseMainContextReturn<Values>;
  useFieldValue: <Name extends ValuesFields<Values>>(arg: UseFieldValueArg<Name>) => UseFieldValueReturn<Values, Name>;
}

export const createUseField = <Values>({ useMainContext, useFieldValue }: CreateUseFieldDependencies<Values>) => {
  const useField = <Name extends ValuesFields<Values>>({ name }: UseFieldArg<Name>): UseFieldReturn<Values, Name> => {
    const { events, errors, setFieldError } = useMainContext();
    const [error, setError] = useState<string | undefined>(get(errors, name));

    useEffect(() => {
      const handleError = (newErrors: FormErrors<Values>) => {
        const newError = get(newErrors, name);

        if (error !== newError) {
          setError(newError);
        }
      };

      events.on(EVENT_ERRORS_CHANGE, handleError);

      return () => {
        events.off(EVENT_ERRORS_CHANGE, handleError);
      }
    }, [events, name]);

    const changeError = useEventCallback((newError: string | undefined) => {
      setFieldError(name, newError);
    });

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
