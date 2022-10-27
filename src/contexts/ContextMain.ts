import { createContext } from "react";
import { ContextValuesInterface, defaultContextValues } from "./ContextValues";
import { EventEmitter } from 'events';
import { ContextErrorsInterface, defaultContextErrors } from "./ContextErrors";

export interface ContextMainInterface<Values> extends ContextValuesInterface<Values>, ContextErrorsInterface<Values> {
  events: EventEmitter;
}

export const createContextMain = <Values>() => createContext<ContextMainInterface<Values>>({
  ...defaultContextValues,
  ...defaultContextErrors,

  events: new EventEmitter(),
});
