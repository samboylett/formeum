import { ChangeEvent, useMemo, useState } from "react";
import { FormErrors } from "../types/FormErrors";
import { DeepIndex } from "../types/DeepIndex";
import { merge, set, isEqual } from 'lodash';
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from 'use-event-callback';
import { FormTouched } from "../types/FormTouched";

export interface UseFormHandlerStatelessArg<Values> {
  initialValues: Values;
  validate?: (values: Values, fieldName?: ValuesFields<Values>) => Promise<FormErrors<Values>>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnFocus?: boolean;
  values: Values;
  onValues: (newValue: Values) => void;
  errors: FormErrors<Values>;
  onErrors: (newErrors: FormErrors<Values>) => void;
  touched: FormTouched<Values>;
  onTouched: (touched: FormTouched<Values>) => void;
  touchOnChange?: boolean;
  touchOnBlur?: boolean;
  touchOnFocus?: boolean;
}

export interface UseFormHandlerStatelessReturn<Values> {
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
  touchOnChange: boolean;
  touchOnBlur: boolean;
  touchOnFocus: boolean;
  validateOnChange: boolean;
  validateOnBlur: boolean;
  validateOnFocus: boolean;
  runValidation: (arg: { newValues?: Values, fieldName?: ValuesFields<Values> }) => Promise<void>;
}

export const createUseFormHandlerStateless = <Values>() => {
  const useFormHandlerStateless = ({
    initialValues,
    validate,
    validateOnChange = false,
    validateOnBlur = true,
    validateOnFocus = false,
    values,
    onValues,
    errors,
    onErrors,
    touched,
    onTouched,
    touchOnChange = true,
    touchOnBlur = true,
    touchOnFocus = false,
  }: UseFormHandlerStatelessArg<Values>): UseFormHandlerStatelessReturn<Values> => {
    const setErrors = useEventCallback((newErrors: FormErrors<Values>) => {
      if (isEqual(newErrors, errors)) return;

      onErrors(newErrors);
    });

    const runValidation: UseFormHandlerStatelessReturn<Values>['runValidation'] = useEventCallback(async ({ newValues = values, fieldName }) => {
      if (!validate) return;

      setErrors(await validate(newValues, fieldName));
    });

    const setValues = useEventCallback(async (newValues: Values, shouldValidate: boolean = validateOnChange) => {
      if (isEqual(newValues, values)) return;

      onValues(newValues);

      if (shouldValidate) {
        await runValidation({ newValues });
      }
    });

    const setFieldValue = useEventCallback(async <Name extends ValuesFields<Values>>(name: Name, value: DeepIndex<Values, Name>, shouldValidate?: boolean) => {
      const newValues = merge({}, values, set({}, name, value));
      setValues(newValues);

      if (shouldValidate) {
        await runValidation({ newValues, fieldName: name })
      }
    });

    const setFieldError = useEventCallback(<Name extends ValuesFields<Values>>(name: Name, error: string | undefined) => {
      setErrors({
        ...errors,
        [name]: error,
      });
    });

    const setFieldTouched = useEventCallback(<Name extends ValuesFields<Values>>(name: Name, isTouched: boolean) => {
      const nextTouched = new Set([...touched]);

      nextTouched[isTouched ? 'add' : 'delete'](name);

      onTouched(nextTouched);
    });

    return {
      values,
      setValues,
      errors,
      setErrors,
      touched,
      setTouched: onTouched,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      initialValues,
      touchOnChange,
      touchOnBlur,
      touchOnFocus,
      validateOnBlur,
      validateOnChange,
      validateOnFocus,
      runValidation,
    };
  };

  return useFormHandlerStateless;
};
