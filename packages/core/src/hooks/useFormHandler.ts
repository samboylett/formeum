import { useState } from "react";
import { FormErrors } from "../types/FormErrors";
import { FormTouched } from "../types/FormTouched";
import { UseFormHandlerStatelessArg, UseFormHandlerStatelessReturn } from "./useFormHandlerStateless";

export type UseFormHandlerArg<Values> = Omit<UseFormHandlerStatelessArg<Values>, 'values' | 'onValues' | 'errors' | 'onErrors' | 'touched' | 'onTouched'>;

export interface UseFormHandlerReturn<Values> extends UseFormHandlerStatelessReturn<Values> {}

export interface CreateUseFormHandlerDependencies<Values> {
  useFormHandlerStateless: (arg: UseFormHandlerStatelessArg<Values>) => UseFormHandlerStatelessReturn<Values>;
}

export const createUseFormHandler = <Values>({ useFormHandlerStateless }: CreateUseFormHandlerDependencies<Values>) => {
  /**
   * The base form handler logic as an uncontrolled component, i.e. all state is handled.
   * 
   * @param {UseFormHandlerArg<Values>} arg
   * @returns {UseFormHandlerReturn<Values>}
   */
  const useFormHandler = (arg: UseFormHandlerArg<Values>): UseFormHandlerReturn<Values> => {
    const [values, onValues] = useState<Values>(arg.initialValues);
    const [errors, onErrors] = useState<FormErrors<Values>>({});
    const [touched, onTouched] = useState<FormTouched<Values>>(new Set());

    return useFormHandlerStateless({
      ...arg,
      values,
      onValues,
      errors,
      onErrors,
      touched,
      onTouched,
    });
  };

  return useFormHandler;
};
