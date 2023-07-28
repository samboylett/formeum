import { memo, ReactElement, ReactNode, useMemo } from "react";
import { UseReactInputArg, UseReactInputReturn } from "../hooks/useReactInput";
import { ValuesFields } from "../types/ValuesFields";
import { BaseValues } from "../types/BaseValues";

export interface FormReactInputProps<
  Values extends BaseValues,
  Name extends ValuesFields<Values>
> extends UseReactInputArg<Name> {
  children: (arg: UseReactInputReturn<Values, Name>) => ReactNode;
}

/**
 * @private
 */
export interface CreateFormReactInputDependencies<Values extends BaseValues> {
  useReactInput: <Name extends ValuesFields<Values>>(
    arg: UseReactInputArg<Name>
  ) => UseReactInputReturn<Values, Name>;
}

/**
 * @private
 */
export const createFormReactInput = <Values extends BaseValues>({
  useReactInput,
}: CreateFormReactInputDependencies<Values>) => {
  /**
   * Get the props for a React input.
   * @param {FormReactInputProps<Values, Name>} props
   * @returns {ReactElement}
   */
  const FormReactInput = <Name extends ValuesFields<Values>>({
    children,
    ...rest
  }: FormReactInputProps<Values, Name>): ReactElement => {
    const arg = useReactInput<Name>(rest);

    return useMemo(() => <>{children(arg)}</>, [children, arg]);
  };

  return memo(FormReactInput) as typeof FormReactInput;
};
