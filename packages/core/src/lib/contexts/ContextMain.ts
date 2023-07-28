import { UseFormHandlerReturn } from "../hooks/useFormHandler";
import { createFastContext } from "react-fast-context";
import { NoContextError } from "../errors/NoContextError";
import { BaseValues } from "../types/BaseValues";

export type ContextMainInterface<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> = UseFormHandlerReturn<Values, ExtraContext>;

const noContextCallback = () => {
  throw new NoContextError("No context detected");
};

/**
 * @private
 */
export const createContextMain = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown> = Record<never, never>
>(
  otherDefaults: ExtraContext
) =>
  createFastContext<ContextMainInterface<Values, ExtraContext>>({
    errors: {},
    setErrors: noContextCallback,
    get values() {
      return noContextCallback();
    },
    get initialValues() {
      return noContextCallback();
    },
    setValues: noContextCallback,
    touched: new Set(),
    setTouched: noContextCallback,
    setFieldValue: noContextCallback,
    setFieldError: noContextCallback,
    setFieldTouched: noContextCallback,
    touchOnChange: true,
    touchOnBlur: true,
    touchOnFocus: false,
    validateOnBlur: true,
    validateOnChange: false,
    validateOnFocus: false,
    validateOnSubmit: true,
    validateOnMount: false,
    submitForm: noContextCallback,
    runValidation: noContextCallback,
    onSubmit: noContextCallback,
    isSubmitting: false,
    disabledWhileSubmitting: false,
    extraContext: otherDefaults,
  });
