import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { EventEmitter } from 'events';
import { FormErrors } from "../types/FormErrors";
import { EVENT_ERRORS_CHANGE, EVENT_VALUES_CHANGE } from "../constants/events";
import { O } from 'ts-toolbelt';
import { DeepIndex } from "../types/DeepIndex";
import { merge, set } from 'lodash';

export interface UseFormHandlerArg<Values> {
  initialValues: Values;
}

export interface UseFormHandlerReturn<Values> {
  values: Values;
  setValues: (values: Values) => void;
  errors: any;
  setErrors: (errors: any) => void;
  events: EventEmitter;
  setFieldValue: <Name extends string & O.Paths<Values>>(name: Name, value: DeepIndex<Values, Name>) => void;
  setFieldError: <Name extends string & O.Paths<Values>>(name: Name, error: string | undefined) => void;
  handleChangeEvent: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
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

    const setFieldValue = useCallback(<Name extends string & O.Paths<Values>>(name: Name, value: DeepIndex<Values, Name>) => {
      setValues(merge({}, values, set({}, name, value)));
    }, [setValues, values]);

    const setFieldError = useCallback(<Name extends string & O.Paths<Values>>(name: Name, error: string | undefined) => {
      setErrors(merge({}, errors, set({}, name, error)));
    }, [setErrors, errors]);

    const handleChangeEvent = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target || event.currentTarget;

      setFieldValue(name as any, value as any);
    }, [setFieldValue]);

    return {
      values,
      setValues,
      errors,
      setErrors,
      events,
      setFieldValue,
      setFieldError,
      handleChangeEvent,
    };
  };

  return useFormHandler;
};
