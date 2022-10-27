import { createContext } from "react";
import { FormErrors } from "../types/FormErrors";

export interface ContextErrorsInterface<Values> {
  errors: FormErrors<Values>;
  setErrors: (newErrors: FormErrors<Values>) => void;
}

export const defaultContextErrors = {
  errors: {},
  setErrors: () => null
} as const;

export const createContextErrors = <Values>() => createContext<ContextErrorsInterface<Values>>(defaultContextErrors);
