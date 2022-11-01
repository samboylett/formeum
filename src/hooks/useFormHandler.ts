import { ChangeEvent, useMemo, useState } from "react";
import { EventEmitter } from 'events';
import { FormErrors } from "../types/FormErrors";
import { EVENT_ERRORS_CHANGE, EVENT_VALUES_CHANGE } from "../constants/events";
import { DeepIndex } from "../types/DeepIndex";
import { merge, set, isEqual } from 'lodash';
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from 'use-event-callback';

export interface UseFormHandlerArg<Values> {
  initialValues: Values;
  validate?: (values: Values, fieldName?: ValuesFields<Values>) => Promise<FormErrors<Values>>;
}

export interface UseFormHandlerReturn<Values> {
  values: Values;
  setValues: (values: Values, shouldValidate?: boolean) => void;
  errors: any;
  setErrors: (errors: any) => void;
  events: EventEmitter;
  setFieldValue: <Name extends ValuesFields<Values>>(name: Name, value: DeepIndex<Values, Name>, shouldValidate?: boolean) => void;
  setFieldError: <Name extends ValuesFields<Values>>(name: Name, error: string | undefined) => void;
  handleChangeEvent: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const createUseFormHandler = <Values>() => {
  const useFormHandler = ({ initialValues, validate }: UseFormHandlerArg<Values>): UseFormHandlerReturn<Values> => {
    const events = useMemo(() => new EventEmitter(), []);
    const [values, baseSetValues] = useState<Values>(initialValues);
    const [errors, baseSetErrors] = useState<FormErrors<Values>>({});

    const setErrors = useEventCallback((newErrors: FormErrors<Values>) => {
      if (isEqual(newErrors, errors)) return;

      baseSetErrors(newErrors);

      events.emit(EVENT_ERRORS_CHANGE, newErrors);
    });

    const setValues = useEventCallback(async (newValues: Values, shouldValidate?: boolean) => {
      if (isEqual(newValues, values)) return;

      baseSetValues(newValues);

      if (shouldValidate && validate) {
        setErrors(await validate(newValues));
      }

      events.emit(EVENT_VALUES_CHANGE, newValues);
    });

    const setFieldValue = useEventCallback(async <Name extends ValuesFields<Values>>(name: Name, value: DeepIndex<Values, Name>, shouldValidate?: boolean) => {
      const newValues = merge({}, values, set({}, name, value));
      setValues(newValues);

      if (shouldValidate && validate) {
        setErrors(await validate(newValues, name))
      }
    });

    const setFieldError = useEventCallback(<Name extends ValuesFields<Values>>(name: Name, error: string | undefined) => {
      setErrors(merge({}, errors, set({}, name, error)));
    });

    const handleChangeEvent = useEventCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target || event.currentTarget;

      setFieldValue(name as any, value as any);
    });

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
