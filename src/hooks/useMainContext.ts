import { Context, useContext } from "react";
import { ContextMainInterface } from "../contexts/ContextMain";

export interface CreateUseMainContextDependencies<Values> {
  ContextMain: Context<ContextMainInterface<Values>>;
}

export type UseMainContextReturn<Values> = ContextMainInterface<Values>;

export const createUseMainContext = <Values>({ ContextMain }: CreateUseMainContextDependencies<Values>) => {
  const useMainContext = (): UseMainContextReturn<Values> => useContext(ContextMain);

  return useMainContext;
};
