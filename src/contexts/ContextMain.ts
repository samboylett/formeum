import { UseFormHandlerReturn } from "../hooks/useFormHandler";
import { createFastContext } from "react-fast-context";

export type ContextMainInterface<Values> = UseFormHandlerReturn<Values>

export const createContextMain = <Values>() => createFastContext<ContextMainInterface<Values>>({
  errors: {},
  setErrors: () => null,
  values: null as any,
  initialValues: null as any,
  setValues: () => null,
  touched: new Set(),
  setTouched: () => null,
  setFieldValue: () => null,
  setFieldError: () => null,
  setFieldTouched: () => null,
  touchOnChange: true,
  touchOnBlur: true,
  touchOnFocus: false,
  validateOnBlur: true,
  validateOnChange: false,
  validateOnFocus: false,
});
