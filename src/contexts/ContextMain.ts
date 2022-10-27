import { createContext } from "react";
import { ContextValuesInterface, defaultContextValues } from "./ContextValues";
import { EventEmitter } from 'events';
import { ContextErrorsInterface, defaultContextErrors } from "./ContextErrors";
import { UseFormHandlerReturn } from "../hooks/useFormHandler";

export interface ContextMainInterface<Values> extends UseFormHandlerReturn<Values> {}

export const createContextMain = <Values>() => createContext<ContextMainInterface<Values>>({
  ...defaultContextValues,
  ...defaultContextErrors,

  events: new EventEmitter(),
  handleChangeEvent: () => {},
  setFieldValue: () => {},
  setFieldError: () => {},
});
