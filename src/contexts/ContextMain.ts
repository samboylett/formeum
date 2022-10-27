import { createContext } from "react";
import { ContextValuesInterface, defaultContextValues } from "./ContextValues";
import { EventEmitter } from 'events';

export interface ContextMainInterface<Values> extends ContextValuesInterface<Values> {
  events: EventEmitter;
}

export const createContextMain = <Values>() => createContext<ContextMainInterface<Values>>({
  ...defaultContextValues,

  events: new EventEmitter(),
});
