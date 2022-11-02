import { useEffect, useMemo, useState } from 'react';
import { UseMainContextReturn } from './useMainContext';
import { get } from 'lodash';
import { EVENT_ERRORS_CHANGE } from '../constants/events';
import { FormErrors } from '../types/FormErrors';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';


export interface UseFieldErrorArg<Name> {
  name: Name;
}

export interface UseFieldErrorReturn {
  error: string | undefined;
  changeError: (error: string | undefined) => void;
}

export interface CreateUseFieldErrorDependencies<Values> {
  useMainContext: () => UseMainContextReturn<Values>;
}

export const createUseFieldError = <Values>({ useMainContext }: CreateUseFieldErrorDependencies<Values>) => {
  const useFieldError = <Name extends ValuesFields<Values>>({ name }: UseFieldErrorArg<Name>): UseFieldErrorReturn => {
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

    return useMemo(() => ({
      error,
      changeError,
    }), [
      error,
      changeError,
    ]);
  };

  return useFieldError;
};
