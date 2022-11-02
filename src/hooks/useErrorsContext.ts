import { Context, useContext } from "react";
import { ContextErrorsInterface } from "../contexts/ContextErrors";

export interface CreateUseErrorsContextDependencies<Values> {
  ContextErrors: Context<ContextErrorsInterface<Values>>;
}

export type UseErrorsContextReturn<Values> = ContextErrorsInterface<Values>;

export const createUseErrorsContext = <Values>({ ContextErrors }: CreateUseErrorsContextDependencies<Values>) => {
  const useErrorsContext = (): UseErrorsContextReturn<Values> => useContext(ContextErrors);

  return useErrorsContext;
};
