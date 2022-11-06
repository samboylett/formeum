import { FastContext, useFastContext, FastContextShouldUpdate } from "react-fast-context";
import { ContextMainInterface } from "../contexts/ContextMain";

export interface CreateUseMainContextDependencies<Values> {
  ContextMain: FastContext<ContextMainInterface<Values>>;
}

export type UseMainContextReturn<Values> = ContextMainInterface<Values>;
export interface UseMainContextArg<Values> {
  shouldUpdate: FastContextShouldUpdate<ContextMainInterface<Values>>;
};

export const createUseMainContext = <Values>({ ContextMain }: CreateUseMainContextDependencies<Values>) => {
  const useMainContext = ({ shouldUpdate }: UseMainContextArg<Values>): UseMainContextReturn<Values> => useFastContext(ContextMain, shouldUpdate);

  return useMainContext;
};
