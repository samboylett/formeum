import { useMemo, useRef } from "react";
import { ContextErrorsInterface } from "../contexts/ContextErrors";
import { ContextMainInterface } from "../contexts/ContextMain";
import { ContextValuesInterface } from "../contexts/ContextValues";
import { UseFormHandlerReturn } from "./useFormHandler";

export interface UseGetFormContextsArg<Values> {
  handler: UseFormHandlerReturn<Values>;
}

export interface UseGetFormContextsReturn<Values> {
  valuesContext: ContextValuesInterface<Values>;
  errorsContext: ContextErrorsInterface<Values>;
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

    const errorsContext: ContextErrorsInterface<Values> = useMemo(() => ({
      errors,
      setErrors,
    }), [errors, setErrors]);

    const context = useRef<ContextMainInterface<Values>>(handler);
    Object.assign(context.current, handler);

    return {
      valuesContext,
      errorsContext,
      mainContext: context.current,
    };
  };

  return useGetFormContexts;
};
