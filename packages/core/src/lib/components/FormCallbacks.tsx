import { memo, ReactElement, ReactNode, useMemo } from "react";
import { UseFormCallbacksReturn } from "../hooks/useFormCallbacks";
import { BaseValues } from "../types/BaseValues";

export interface FormCallbacksProps<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
  children: (arg: UseFormCallbacksReturn<Values, ExtraContext>) => ReactNode;
}

/**
 * @private
 */
export interface CreateFormCallbacksDependencies<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
  useFormCallbacks: () => UseFormCallbacksReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createFormCallbacks = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
>({
  useFormCallbacks,
}: CreateFormCallbacksDependencies<Values, ExtraContext>) => {
  /**
   * Get all form handler functions.
   * @param {FormCallbacksProps<Values>} props
   * @returns {ReactElement}
   */
  const FormCallbacks = ({
    children,
  }: FormCallbacksProps<Values, ExtraContext>): ReactElement => {
    const arg = useFormCallbacks();

    return useMemo(() => <>{children(arg)}</>, [children, arg]);
  };

  return memo(FormCallbacks) as typeof FormCallbacks;
};
