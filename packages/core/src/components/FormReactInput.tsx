import { memo, ReactElement, ReactNode, useMemo } from "react";
import { UseReactInputArg, UseReactInputReturn } from "../hooks/useReactInput";
import { ValuesFields } from "../types/ValuesFields";

export interface FormReactInputProps<Values, Name extends ValuesFields<Values>> extends UseReactInputArg<Name> {
  children: (arg: UseReactInputReturn<Values, Name>) => ReactNode;
}

/**
 * @private
 */
export interface CreateFormReactInputDependencies<Values> {
  useReactInput: <Name extends ValuesFields<Values>>(arg: UseReactInputArg<Name>) => UseReactInputReturn<Values, Name>;
}

/**
 * @private
 */
export const createFormReactInput = <Values extends unknown>({
  useReactInput,
}: CreateFormReactInputDependencies<Values>) => {
  /**
   * Get the props for a React input.
   * @param {FormReactInputProps<Values, Name>} props 
   * @returns {ReactElement}
   */
  const FormReactInput = <Name extends ValuesFields<Values>>({ children, ...rest }: FormReactInputProps<Values, Name>): ReactElement => {
    const arg = useReactInput<Name>(rest);

    return useMemo(() => (
      <>
        {children(arg)}
      </>
    ), [children, arg])
  };

  return memo(FormReactInput) as typeof FormReactInput;
};
