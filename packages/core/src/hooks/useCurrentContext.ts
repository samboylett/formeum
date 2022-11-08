import { MutableRefObject, RefObject } from "react";
import { FastContext, useCurrentContext as useCurrentContextBase } from "react-fast-context";
import { ContextMainInterface } from "../contexts/ContextMain";

export interface CreateUseCurrentContextDependencies<Values> {
  ContextMain: FastContext<ContextMainInterface<Values>>;
}

export type UseCurrentContextReturn<Values> = Readonly<MutableRefObject<ContextMainInterface<Values>>>;

export const createUseCurrentContext = <Values>({ ContextMain }: CreateUseCurrentContextDependencies<Values>) => {
  /**
   * Use the context as a ref object, and never trigger a re-render.
   * 
   * @returns {UseCurrentContextReturn<Values>}
   */
  const useCurrentContext = (): UseCurrentContextReturn<Values> => useCurrentContextBase(ContextMain);

  return useCurrentContext;
};