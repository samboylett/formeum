import { memo, ReactNode, useMemo } from "react";
import { UseHTMLInputArg, UseHTMLInputReturn } from "../hooks/useHTMLInput";
import { ValuesFields } from "../types/ValuesFields";

export interface FormHTMLInputProps<Values, Name extends ValuesFields<Values>> extends UseHTMLInputArg<Name> {
  children: (arg: UseHTMLInputReturn<Values, Name>) => ReactNode;
}

export interface CreateFormHTMLInputDependencies<Values> {
  useHTMLInput: <Name extends ValuesFields<Values>>(arg: UseHTMLInputArg<Name>) => UseHTMLInputReturn<Values, Name>;
}

export const createFormHTMLInput = <Values extends unknown>({
  useHTMLInput,
}: CreateFormHTMLInputDependencies<Values>) => {
  const FormHTMLInput = <Name extends ValuesFields<Values>>({ children, ...rest }: FormHTMLInputProps<Values, Name>) => {
    const arg = useHTMLInput<Name>(rest);

    return useMemo(() => (
      <>
        {children(arg)}
      </>
    ), [children, arg])
  };

  return memo(FormHTMLInput) as typeof FormHTMLInput;
};
