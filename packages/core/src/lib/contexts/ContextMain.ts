import { UseFormHandlerReturn } from "../hooks/useFormHandler";
import { createFastContext } from "react-fast-context";
import { NoContextError } from "../errors/NoContextError";

export type ContextMainInterface<Values> = UseFormHandlerReturn<Values>;

const noContextCallback = () => {
  throw new NoContextError("No context detected");
};

/**
 * @private
 */
export const createContextMain = <Values>() =>
  createFastContext<ContextMainInterface<Values>>({
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
  });
