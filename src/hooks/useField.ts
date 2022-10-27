import { useCallback, useEffect, useState } from 'react';
import { O } from 'ts-toolbelt';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextReturn } from './useMainContext';
import { get } from 'lodash';
import { EVENT_ERRORS_CHANGE, EVENT_VALUES_CHANGE } from '../constants/events';
import { FormErrors } from '../types/FormErrors';

export interface UseFieldArg<Name> {
  name: Name;
}

export interface UseFieldReturn<Values, Name extends string> {
  value: DeepIndex<Values, Name>;
  error: string | undefined;
  name: Name;
  changeValue: (newValue: DeepIndex<Values, Name>) => void;
  changeError: (error: string | undefined) => void;
}

export interface CreateUseFieldDependencies<Values> {
  useMainContext: () => UseMainContextReturn<Values>;
}

export const createUseField = <Values>({ useMainContext }: CreateUseFieldDependencies<Values>) => {
  const useField = <Name extends string & O.Paths<Values>>({ name }: UseFieldArg<Name>): UseFieldReturn<Values, Name> => {
    const { events, values, errors, setFieldValue, setFieldError } = useMainContext();
    const [value, setValue] = useState<DeepIndex<Values, Name>>(get(values, name));
    const [error, setError] = useState<string | undefined>(get(errors, name));

    useEffect(() => {
      const handleChange = (newValues: Values) => {
        const newValue = get(newValues, name);

        if (values !== newValue) {
          setValue(newValue);
        }
      };

      const handleError = (newErrors: FormErrors<Values>) => {
        const newError = get(newErrors, name);

        if (error !== newError) {
          setError(newError);
        }
      };

      events.on(EVENT_VALUES_CHANGE, handleChange);
      events.on(EVENT_ERRORS_CHANGE, handleError);

      return () => {
        events.off(EVENT_VALUES_CHANGE, handleChange);
        events.off(EVENT_ERRORS_CHANGE, handleError);
      }
    }, [events, values, name, setValue]);

    const changeValue = useCallback((newValue: DeepIndex<Values, Name>) => {
      setFieldValue(name, newValue);
    }, [setFieldValue]);

    const changeError = useCallback((newError: string | undefined) => {
      setFieldError(name, newError);
    }, [setFieldError]);

    return {
      value,
      error,
      name,
      changeValue,
      changeError,
    };
  };

  return useField;
};
