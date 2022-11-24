import { isEqual } from "lodash";
import { memo, ReactElement, ReactNode, useMemo } from "react";
import {
  UseMainContextArg,
  UseMainContextReturn,
} from "../hooks/useMainContext";

export interface FormValuesProps<Values> {
  children: (arg: Values) => ReactNode;
}

/**
 * @private
 */
export interface CreateFormValuesDependencies<
  Values,
  ExtraContext extends Record<string, unknown>
> {
  useMainContext: (
    arg: UseMainContextArg<Values, ExtraContext>
  ) => UseMainContextReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createFormValues = <
  Values extends unknown,
  ExtraContext extends Record<string, unknown>
>({
  useMainContext,
}: CreateFormValuesDependencies<Values, ExtraContext>) => {
  /**
   * Get all the form values.
   *
   * @param {FormValuesProps<Values>} props
   * @returns {ReactElement}
   */
  const FormValues = ({ children }: FormValuesProps<Values>): ReactElement => {
    const { values } = useMainContext({
      shouldUpdate: (oldValue, newValue) =>
        !isEqual(oldValue.values, newValue.values),
    });

    return useMemo(() => <>{children(values)}</>, [children, values]);
  };

  return memo(FormValues) as typeof FormValues;
};
