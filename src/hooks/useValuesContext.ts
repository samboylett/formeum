import { Context, useContext } from "react";
import { ContextValuesInterface } from "../contexts/ContextValues";

export interface CreateUseValueContextDependencies<Values> {
  ContextValues: Context<ContextValuesInterface<Values>>;
}

export type UseValuesContextReturn<Values> = ContextValuesInterface<Values>;

export const createUseValuesContext = <Values>({ ContextValues }: CreateUseValueContextDependencies<Values>) => {
  const useValuesContext = (): UseValuesContextReturn<Values> => useContext(ContextValues);

  return useValuesContext;
};
