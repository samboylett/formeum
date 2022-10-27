import { createContext } from "react";
import { defaultContextValues } from "./ContextValues";
import { EventEmitter } from 'events';
import { defaultContextErrors } from "./ContextErrors";
import { UseFormHandlerReturn } from "../hooks/useFormHandler";

export type ContextMainInterface<Values> = UseFormHandlerReturn<Values>

export const createContextMain = <Values>() => createContext<ContextMainInterface<Values>>({
  ...defaultContextValues,
  ...defaultContextErrors,

  events: new EventEmitter(),
  handleChangeEvent: () => null,
  setFieldValue: () => null,
  setFieldError: () => null,
});
