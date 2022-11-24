import { useState } from "react";
import { FormErrors } from "../types/FormErrors";
import { FormTouched } from "../types/FormTouched";
import {
  UseFormHandlerStatelessArg,
  UseFormHandlerStatelessReturn,
} from "./useFormHandlerStateless";

export type UseFormHandlerArg<Values> = Omit<
  UseFormHandlerStatelessArg<Values>,
  | "values"
  | "onValues"
  | "errors"
  | "onErrors"
  | "touched"
  | "onTouched"
  | "isSubmitting"
  | "onIsSubmitting"
>;

export type UseFormHandlerReturn<Values, ExtraContext extends Record<string, unknown>> =
  UseFormHandlerStatelessReturn<Values, ExtraContext>;

/**
 * @private
 */
export interface CreateUseFormHandlerDependencies<Values, ExtraContext extends Record<string, unknown>> {
  useFormHandlerStateless: (
    arg: UseFormHandlerStatelessArg<Values>
  ) => UseFormHandlerStatelessReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createUseFormHandler = <Values, ExtraContext extends Record<string, unknown>>({
  useFormHandlerStateless,
}: CreateUseFormHandlerDependencies<Values, ExtraContext>) => {
  /**
   * The base form handler logic as an uncontrolled component, i.e. all state is handled.
   *
   * @param {UseFormHandlerArg<Values>} arg
   * @returns {UseFormHandlerReturn<Values>}
   */
  const useFormHandler = (
    arg: UseFormHandlerArg<Values>
  ): UseFormHandlerReturn<Values, ExtraContext> => {
    const [values, onValues] = useState<Values>(arg.initialValues);
    const [errors, onErrors] = useState<FormErrors<Values>>({});
    const [touched, onTouched] = useState<FormTouched<Values>>(new Set());
    const [isSubmitting, onIsSubmitting] = useState<boolean>(false);

    return useFormHandlerStateless({
      ...arg,
      values,
      onValues,
      errors,
      onErrors,
      touched,
      onTouched,
      isSubmitting,
      onIsSubmitting,
    });
  };

  return useFormHandler;
};
