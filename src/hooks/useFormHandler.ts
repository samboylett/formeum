import { ChangeEvent, useMemo, useState } from "react";
import { FormErrors } from "../types/FormErrors";
import { DeepIndex } from "../types/DeepIndex";
import { merge, set, isEqual } from 'lodash';
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from 'use-event-callback';
import { FormTouched } from "../types/FormTouched";

export interface UseFormHandlerArg<Values> {
  initialValues: Values;
  validate?: (values: Values, fieldName?: ValuesFields<Values>) => Promise<FormErrors<Values>>;
  validateOnChange?: boolean;
}

export interface UseFormHandlerReturn<Values> {
  values: Values;
  initialValues: Values;
  setValues: (values: Values, shouldValidate?: boolean) => void;
  errors: FormErrors<Values>;
  setErrors: (errors: FormErrors<Values>) => void;
  touched: FormTouched<Values>;
  setTouched: (touched: FormTouched<Values>) => void;
  setFieldValue: <Name extends ValuesFields<Values>>(name: Name, value: DeepIndex<Values, Name>, shouldValidate?: boolean) => void;
  setFieldError: <Name extends ValuesFields<Values>>(name: Name, error: string | undefined) => void;
  setFieldTouched: <Name extends ValuesFields<Values>>(name: Name, touched: boolean) => void;
}

export const createUseFormHandler = <Values>() => {
  const useFormHandler = ({ initialValues, validate, validateOnChange = false }: UseFormHandlerArg<Values>): UseFormHandlerReturn<Values> => {
    const [values, baseSetValues] = useState<Values>(initialValues);
    const [errors, baseSetErrors] = useState<FormErrors<Values>>({});
    const [touched, setTouched] = useState<FormTouched<Values>>([]);

    const setErrors = useEventCallback((newErrors: FormErrors<Values>) => {
      if (isEqual(newErrors, errors)) return;

      baseSetErrors(newErrors);
    });

    const setValues = useEventCallback(async (newValues: Values, shouldValidate: boolean = validateOnChange) => {
      if (isEqual(newValues, values)) return;

      baseSetValues(newValues);

      if (shouldValidate && validate) {
        setErrors(await validate(newValues));
      }
    });

    const setFieldValue = useEventCallback(async <Name extends ValuesFields<Values>>(name: Name, value: DeepIndex<Values, Name>, shouldValidate?: boolean) => {
      const newValues = merge({}, values, set({}, name, value));
      setValues(newValues);

      if (shouldValidate && validate) {
        setErrors(await validate(newValues, name))
      }
    });

    const setFieldError = useEventCallback(<Name extends ValuesFields<Values>>(name: Name, error: string | undefined) => {
      setErrors({
        ...errors,
        [name]: error,
      });
    });

    const setFieldTouched = useEventCallback(<Name extends ValuesFields<Values>>(name: Name, isTouched: boolean) => {
      const nextTouched = touched.filter(n => n !== name);

      if (isTouched) nextTouched.push(name);

      setTouched(nextTouched);
    });

    return {
      values,
      setValues,
      errors,
      setErrors,
      touched,
      setTouched,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      initialValues,
    };
  };

  return useFormHandler;
};
