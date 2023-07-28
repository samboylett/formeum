import { memo, ReactElement, ReactNode, useMemo } from "react";
import {
  UseHTMLCheckboxArg,
  UseHTMLCheckboxReturn,
} from "../hooks/useHTMLCheckbox";
import { ValuesFields } from "../types/ValuesFields";
import { BaseValues } from "../types/BaseValues";

export interface FormHTMLCheckboxProps<
  Values extends BaseValues,
  Name extends ValuesFields<Values>
> extends UseHTMLCheckboxArg<Values, Name> {
  children: (arg: UseHTMLCheckboxReturn<Values, Name>) => ReactNode;
}

/**
 * @private
 */
export interface CreateFormHTMLCheckboxDependencies<
  Values extends BaseValues
> {
  useHTMLCheckbox: <Name extends ValuesFields<Values>>(
    arg: UseHTMLCheckboxArg<Values, Name>
  ) => UseHTMLCheckboxReturn<Values, Name>;
}

/**
 * @private
 */
export const createFormHTMLCheckbox = <Values extends BaseValues>({
  useHTMLCheckbox,
}: CreateFormHTMLCheckboxDependencies<Values>) => {
  /**
   * Get the props for a HTML checkbox.
   *
   * @param {FormHTMLCheckboxProps<Values, Name>} props
   * @returns {ReactElement}
   */
  const FormHTMLCheckbox = <Name extends ValuesFields<Values>>({
    children,
    ...rest
  }: FormHTMLCheckboxProps<Values, Name>): ReactElement => {
    const arg = useHTMLCheckbox<Name>(rest);

    return useMemo(() => <>{children(arg)}</>, [children, arg]);
  };

  return memo(FormHTMLCheckbox) as typeof FormHTMLCheckbox;
};
