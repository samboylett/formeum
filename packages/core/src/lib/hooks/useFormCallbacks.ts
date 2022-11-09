import { useMemo } from "react";
import { pick } from "lodash";
import { UseCurrentContextReturn } from "./useCurrentContext";
import { UseFormHandlerReturn } from "./useFormHandler";
import { ContextMainInterface } from "../contexts/ContextMain";

export const FORM_CALLBACK_NAMES = [
  "submitForm",
  "setValues",
  "setErrors",
  "setTouched",
  "setFieldValue",
  "setFieldError",
  "setFieldTouched",
  "runValidation",
  "onSubmit",
] as const;

export type FormCallbackNames = (typeof FORM_CALLBACK_NAMES)[number];

export type UseFormCallbacksReturn<Values> = Pick<
  UseFormHandlerReturn<Values>,
  FormCallbackNames
>;

/**
 * @private
 */
export interface CreateUseFormCallbacksDependencies<Values> {
  useCurrentContext: () => UseCurrentContextReturn<Values>;
}

/**
 * @private
 */
export const createUseFormCallbacks = <Values>({
  useCurrentContext,
}: CreateUseFormCallbacksDependencies<Values>) => {
  /**
   * Get all functions from the form handler. Will never trigger a re-render.
   *
   * @returns {UseFormCallbacksReturn<Values>}
   */
  const useFormCallbacks = (): UseFormCallbacksReturn<Values> => {
    const contextRef = useCurrentContext();

    return useMemo<UseFormCallbacksReturn<Values>>(
      () =>
        pick<ContextMainInterface<Values>, FormCallbackNames>(
          contextRef.current,
          ...FORM_CALLBACK_NAMES,
        ),
      [contextRef]
    );
  };

  return useFormCallbacks;
};
