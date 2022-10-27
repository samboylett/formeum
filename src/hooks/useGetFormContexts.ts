import { useMemo, useRef } from "react";
import { ContextMainInterface } from "../contexts/ContextMain";
import { ContextValuesInterface } from "../contexts/ContextValues";
import { UseFormHandlerReturn } from "./useFormHandler";

export interface UseGetFormContextsArg<Values> {
  handler: UseFormHandlerReturn<Values>;
}

export interface UseGetFormContextsReturn<Values> {
  valuesContext: ContextValuesInterface<Values>;
  mainContext: ContextMainInterface<Values>;
}

export const createUseGetFormContexts = <Values>() => {
  const useGetFormContexts = ({ handler }: UseGetFormContextsArg<Values>): UseGetFormContextsReturn<Values> => {
    const {
      values,
      setValues,
      errors,
      setErrors,
    } = handler;

    const valuesContext: ContextValuesInterface<Values> = useMemo(() => ({
      values,
      setValues,
    }), [values, setValues]);

    const nextContext = {
      ...valuesContext,
      errors,
      setErrors,
    } as const;

    const context = useRef<typeof nextContext>(nextContext);
    Object.assign(context.current, nextContext);

    return {
      valuesContext,
      mainContext: context.current,
    };
  };

  return useGetFormContexts;
};
