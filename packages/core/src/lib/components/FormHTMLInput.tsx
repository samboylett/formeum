import { memo, ReactElement, ReactNode, useMemo } from "react";
import { UseHTMLInputArg, UseHTMLInputReturn } from "../hooks/useHTMLInput";
import { ValuesFields } from "../types/ValuesFields";

export interface FormHTMLInputProps<Values extends Record<any, any>, Name extends ValuesFields<Values>>
  extends UseHTMLInputArg<Values, Name> {
  children: (arg: UseHTMLInputReturn<Values, Name>) => ReactNode;
}

/**
 * @private
 */
export interface CreateFormHTMLInputDependencies<Values extends Record<any, any>> {
  useHTMLInput: <Name extends ValuesFields<Values>>(
    arg: UseHTMLInputArg<Values, Name>
  ) => UseHTMLInputReturn<Values, Name>;
}

/**
 * @private
 */
export const createFormHTMLInput = <Values extends Record<any, any>>({
  useHTMLInput,
}: CreateFormHTMLInputDependencies<Values>) => {
  /**
   * Get the props for a HTML input.
   *
   * @param {FormHTMLInputProps<Values, Name>} props
   * @returns {ReactElement}
   */
  const FormHTMLInput = <Name extends ValuesFields<Values>>({
    children,
    ...rest
  }: FormHTMLInputProps<Values, Name>): ReactElement => {
    const arg = useHTMLInput<Name>(rest);

    return useMemo(() => <>{children(arg)}</>, [children, arg]);
  };

  return memo(FormHTMLInput) as typeof FormHTMLInput;
};
