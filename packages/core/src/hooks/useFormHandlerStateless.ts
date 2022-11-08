import { ChangeEvent, useMemo, useState } from "react";
import { FormErrors } from "../types/FormErrors";
import { DeepIndex } from "../types/DeepIndex";
import { merge, set, isEqual } from 'lodash';
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from 'use-event-callback';
import { FormTouched } from "../types/FormTouched";
const latest = require('promise-latest');

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
  touched: FormTouched<Values>;
  errors: FormErrors<Values>;
  touchOnChange: boolean;
  touchOnBlur: boolean;
  touchOnFocus: boolean;
  validateOnChange: boolean;
  validateOnBlur: boolean;
  validateOnFocus: boolean;

  /**
   * Update the form data in its entirity.
   * 
   * @param {Values} values
   * @param {boolean?} shouldValidate
   */
  setValues: (values: Values, shouldValidate?: boolean) => void;

  /**
   * Set the entire form errors object.
   * 
   * @param {FormErrors<Values>} errors
   */
  setErrors: (errors: FormErrors<Values>) => void;
  
  /**
   * Set the entire form touched set
   * 
   * @param {FormTouched<Values>} touched
   */
  setTouched: (touched: FormTouched<Values>) => void;

  /**
   * Set a fields value
   * 
   * @param {Name} name
   * @param {DeepIndex<Values, Name>} value
   * @param {boolean?} shouldValidate
   */
  setFieldValue: <Name extends ValuesFields<Values>>(name: Name, value: DeepIndex<Values, Name>, shouldValidate?: boolean) => void;
  
  /**
   * Set a fields error
   * 
   * @param {Name} name
   * @param {string|undefined} error
   */
  setFieldError: <Name extends ValuesFields<Values>>(name: Name, error: string | undefined) => void;

  /**
   * Set a fields touched state
   * 
   * @param {Name} name
   * @param {boolean} touched
   */
  setFieldTouched: <Name extends ValuesFields<Values>>(name: Name, touched: boolean) => void;

  /**
   * Run the validation and set the errors from the result.
   */
  runValidation: (arg: { newValues?: Values, fieldName?: ValuesFields<Values> }) => Promise<void>;
}

export const createUseFormHandlerStateless = <Values>() => {
  /**
   * The base form handler logic as a controlled component, i.e. stateless.
   * 
   * @param {UseFormHandlerStatelessArg<Values>} arg
   * @returns {UseFormHandlerStatelessReturn<Values>}
   */
  const useFormHandlerStateless = ({
    initialValues,
    validate: baseValidate,
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

    const notLatestvalidate: NonNullable<typeof baseValidate> = useEventCallback(baseValidate || (() => Promise.resolve({})));
    const validate: NonNullable<typeof baseValidate> = useMemo(() => latest(notLatestvalidate), [notLatestvalidate]);

    const runValidation: UseFormHandlerStatelessReturn<Values>['runValidation'] = useEventCallback(async ({ newValues = values, fieldName }) => {
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