import { createContext } from "react";

export interface ContextValuesInterface<Values> {
  values: Values;
  setValues: (values: Values) => void;
}

export const defaultContextValues = {
  values: null as any,
  setValues: () => null
} as const;

export const createContextValues = <Values>() => createContext<ContextValuesInterface<Values>>(defaultContextValues);
