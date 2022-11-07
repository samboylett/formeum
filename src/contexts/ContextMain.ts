import { UseFormHandlerReturn } from "../hooks/useFormHandler";
import { createFastContext } from "react-fast-context";

export type ContextMainInterface<Values> = UseFormHandlerReturn<Values>

export const createContextMain = <Values>() => createFastContext<ContextMainInterface<Values>>({
  errors: {},
  setErrors: () => null,
  values: null as any,
  setValues: () => null,
  setFieldValue: () => null,
  setFieldError: () => null,
});
