import { useState } from "react";
import { FormErrors } from "../types/FormErrors";
import { FormTouched } from "../types/FormTouched";
import {
  UseFormHandlerStatelessArg,
  UseFormHandlerStatelessReturn,
} from "./useFormHandlerStateless";
import { BaseValues } from "../types/BaseValues";

export type UseFormHandlerArg<Values extends BaseValues> = Omit<
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

export type UseFormHandlerReturn<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> = UseFormHandlerStatelessReturn<Values, ExtraContext>;

/**
 * @private
 */
export interface CreateUseFormHandlerDependencies<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
  useFormHandlerStateless: (
    arg: UseFormHandlerStatelessArg<Values>
  ) => UseFormHandlerStatelessReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createUseFormHandler = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
>({
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
