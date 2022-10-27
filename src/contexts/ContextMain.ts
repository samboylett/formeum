import { createContext } from "react";
import { ContextValuesInterface, defaultContextValues } from "./ContextValues";

export interface ContextMainInterface<Values> extends ContextValuesInterface<Values> {}

export const createContextMain = <Values>() => createContext<ContextMainInterface<Values>>({
  ...defaultContextValues
});
