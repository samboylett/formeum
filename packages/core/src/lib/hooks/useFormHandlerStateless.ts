import { FormEvent, useEffect, useMemo } from "react";
import { FormErrors } from "../types/FormErrors";
import { DeepIndex } from "../types/DeepIndex";
import { merge, set, isEqual } from "lodash";
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from "use-event-callback";
import { FormTouched } from "../types/FormTouched";
import { AlreadySubmittingError } from "../errors/AlreadySubmittingError";
import { BaseValues } from "../types/BaseValues";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const latest = require("promise-latest");

export interface UseFormHandlerStatelessArg<Values extends BaseValues> {
  initialValues: Values;
  validate?: (
    values: Values,
    fieldName?: ValuesFields<Values>
  ) => Promise<FormErrors<Values>>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnFocus?: boolean;
  validateOnSubmit?: boolean;
  validateOnMount?: boolean;
  disabledWhileSubmitting?: boolean;
  values: Values;
  onValues: (newValue: Values) => void;
  errors: FormErrors<Values>;
  onErrors: (newErrors: FormErrors<Values>) => void;
  touched: FormTouched<Values>;
  onTouched: (touched: FormTouched<Values>) => void;
  touchOnChange?: boolean;
  touchOnBlur?: boolean;
  touchOnFocus?: boolean;
  onSubmit: (values: Values) => void;
  isSubmitting: boolean;
  onIsSubmitting: (nextIsSubmitting: boolean) => void;
}

export interface UseFormHandlerStatelessReturn<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
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
  validateOnSubmit: boolean;
  validateOnMount: boolean;
  disabledWhileSubmitting: boolean;
  isSubmitting: boolean;
  extraContext: ExtraContext;

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
  setFieldValue: <Name extends ValuesFields<Values>>(
    name: Name,
    value: DeepIndex<Values, Name>,
    shouldValidate?: boolean
  ) => void;

  /**
   * Set a fields error
   *
   * @param {Name} name
   * @param {string|undefined} error
   */
  setFieldError: <Name extends ValuesFields<Values>>(
    name: Name,
    error: string | undefined
  ) => void;

  /**
   * Set a fields touched state
   *
   * @param {Name} name
   * @param {boolean} touched
   */
  setFieldTouched: <Name extends ValuesFields<Values>>(
    name: Name,
    touched: boolean
  ) => void;

  /**
   * Run the validation and set the errors from the result.
   */
  runValidation: (arg: {
    newValues?: Values;
    fieldName?: ValuesFields<Values>;
  }) => Promise<FormErrors<Values>>;

  /**
   * Submit the form.
   *
   * @param {boolean?} shouldValidate
   * @throws {AlreadySubmittingError}
   * @returns {Promise<void>}
   */
  submitForm: (shouldValidate?: boolean) => Promise<void>;

  /**
   * Submit the form via a form onSubmit event.
   *
   * @throws {AlreadySubmittingError}
   */
  onSubmit: (event: Pick<FormEvent, "preventDefault">) => Promise<void>;
}

/**
 * @private
 */
export interface CreateUseFormHandlerStatelessDependencies<
  ExtraContext extends Record<string, unknown>
> {
  defaultContext: ExtraContext;
}

/**
 * @private
 */
export const createUseFormHandlerStateless = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
>({
  defaultContext,
}: CreateUseFormHandlerStatelessDependencies<ExtraContext>) => {
  /**
   * The base form handler logic as a controlled component, i.e. stateless.
   *
   * @param {UseFormHandlerStatelessArg<Values>} arg
   * @returns {UseFormHandlerStatelessReturn<Values, ExtraContext>}
   */
  const useFormHandlerStateless = ({
    initialValues,
    validate: baseValidate,
    validateOnChange = false,
    validateOnBlur = true,
    validateOnFocus = false,
    validateOnSubmit = true,
    validateOnMount = false,
    disabledWhileSubmitting = false,
    values,
    onValues,
    errors,
    onErrors,
    touched,
    onTouched,
    onSubmit: onOuterSubmit,
    touchOnChange = true,
    touchOnBlur = true,
    touchOnFocus = false,
    isSubmitting,
    onIsSubmitting,
  }: UseFormHandlerStatelessArg<Values>): UseFormHandlerStatelessReturn<
    Values,
    ExtraContext
  > => {
    const setErrors = useEventCallback((newErrors: FormErrors<Values>) => {
      if (isEqual(newErrors, errors)) return;

      onErrors(newErrors);
    });

    const notLatestvalidate: NonNullable<typeof baseValidate> =
      useEventCallback(baseValidate || (() => Promise.resolve({})));
    const validate: NonNullable<typeof baseValidate> = useMemo(
      () => latest(notLatestvalidate),
      [notLatestvalidate]
    );

    const runValidation: UseFormHandlerStatelessReturn<
      Values,
      ExtraContext
    >["runValidation"] = useEventCallback(
      async ({ newValues = values, fieldName }) => {
        const nextErrors: FormErrors<Values> = await validate(
          newValues,
          fieldName
        );

        setErrors(nextErrors);

        return nextErrors;
      }
    );

    const submitForm = useEventCallback(
      async (shouldValidate: boolean = validateOnSubmit) => {
        if (isSubmitting) {
          return Promise.reject(
            new AlreadySubmittingError("Already submitting form")
          );
        }

        try {
          onIsSubmitting(true);

          if (shouldValidate) {
            const nextErrors = await runValidation({ newValues: values });

            if (Object.values(nextErrors).some(Boolean)) return;
          }

          await onOuterSubmit(values);
        } finally {
          onIsSubmitting(false);
        }
      }
    );

    const onSubmit = useEventCallback(
      (event: Pick<FormEvent, "preventDefault">) => {
        event.preventDefault();

        return submitForm();
      }
    );

    const setValues = useEventCallback(
      async (newValues: Values, shouldValidate: boolean = validateOnChange) => {
        if (isEqual(newValues, values)) return;

        onValues(newValues);

        if (shouldValidate) {
          await runValidation({ newValues });
        }
      }
    );

    const setFieldValue = useEventCallback(
      async <Name extends ValuesFields<Values>>(
        name: Name,
        value: DeepIndex<Values, Name>,
        shouldValidate: boolean = validateOnChange
      ) => {
        const newValues = merge({}, values, set({}, name, value));
        setValues(newValues, false);

        if (shouldValidate) {
          await runValidation({ newValues, fieldName: name });
        }
      }
    );

    const setFieldError = useEventCallback(
      <Name extends ValuesFields<Values>>(
        name: Name,
        error: string | undefined
      ) => {
        setErrors({
          ...errors,
          [name]: error,
        });
      }
    );

    const setFieldTouched = useEventCallback(
      <Name extends ValuesFields<Values>>(name: Name, isTouched: boolean) => {
        const nextTouched = new Set([...touched]);

        nextTouched[isTouched ? "add" : "delete"](name);

        onTouched(nextTouched);
      }
    );

    useEffect(() => {
      if (validateOnMount) {
        runValidation({});
      }
    }, [validateOnMount]);

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
      submitForm,
      initialValues,
      touchOnChange,
      touchOnBlur,
      touchOnFocus,
      validateOnBlur,
      validateOnChange,
      validateOnFocus,
      validateOnMount,
      runValidation,
      validateOnSubmit,
      isSubmitting,
      onSubmit,
      disabledWhileSubmitting,
      extraContext: defaultContext,
    };
  };

  return useFormHandlerStateless;
};
