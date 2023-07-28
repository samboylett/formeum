import { useMemo } from "react";
import { pick } from "lodash";
import { UseCurrentContextReturn } from "./useCurrentContext";
import { UseFormHandlerReturn } from "./useFormHandler";
import { ContextMainInterface } from "../contexts/ContextMain";
import { BaseValues } from "../types/BaseValues";

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

export type FormCallbackNames = typeof FORM_CALLBACK_NAMES[number];

export type UseFormCallbacksReturn<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> = Pick<UseFormHandlerReturn<Values, ExtraContext>, FormCallbackNames>;

/**
 * @private
 */
export interface CreateUseFormCallbacksDependencies<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
  useCurrentContext: () => UseCurrentContextReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createUseFormCallbacks = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
>({
  useCurrentContext,
}: CreateUseFormCallbacksDependencies<Values, ExtraContext>) => {
  /**
   * Get all functions from the form handler. Will never trigger a re-render.
   *
   * @returns {UseFormCallbacksReturn<Values>}
   */
  const useFormCallbacks = (): UseFormCallbacksReturn<Values, ExtraContext> => {
    const contextRef = useCurrentContext();

    return useMemo<UseFormCallbacksReturn<Values, ExtraContext>>(
      () =>
        pick<ContextMainInterface<Values, ExtraContext>, FormCallbackNames>(
          contextRef.current,
          ...FORM_CALLBACK_NAMES
        ),
      [contextRef]
    );
  };

  return useFormCallbacks;
};
