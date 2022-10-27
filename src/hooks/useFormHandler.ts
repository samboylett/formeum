import { useCallback, useMemo, useState } from "react";
import { EventEmitter } from 'events';
import { FormErrors } from "../types/FormErrors";
import { EVENT_ERRORS_CHANGE, EVENT_VALUES_CHANGE } from "../constants/events";

export interface UseFormHandlerArg<Values> {
  initialValues: Values;
}

export interface UseFormHandlerReturn<Values> {
  values: Values;
  setValues: (values: Values) => void;
  errors: any;
  setErrors: (errors: any) => void;
  events: EventEmitter;
}

export const createUseFormHandler = <Values>() => {
  const useFormHandler = ({ initialValues }: UseFormHandlerArg<Values>): UseFormHandlerReturn<Values> => {
    const events = useMemo(() => new EventEmitter(), []);
    const [values, baseSetValues] = useState<Values>(initialValues);
    const [errors, baseSetErrors] = useState<FormErrors<Values>>({});

    const setValues = useCallback((newValues: Values) => {
      baseSetValues(newValues);

      events.emit(EVENT_VALUES_CHANGE, newValues);
    }, [baseSetValues, events]);

    const setErrors = useCallback((newErrors: FormErrors<Values>) => {
      baseSetErrors(newErrors);

      events.emit(EVENT_ERRORS_CHANGE, newErrors);
    }, [baseSetErrors, events]);

    return {
      values,
      setValues,
      errors,
      setErrors,
      events,
    };
  };

  return useFormHandler;
};
