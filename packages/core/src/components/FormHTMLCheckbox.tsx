import { memo, ReactNode, useMemo } from "react";
import { UseHTMLCheckboxArg, UseHTMLCheckboxReturn } from "../hooks/useHTMLCheckbox";
import { ValuesFields } from "../types/ValuesFields";

export interface FormHTMLCheckboxProps<Values, Name extends ValuesFields<Values>> extends UseHTMLCheckboxArg<Name> {
  children: (arg: UseHTMLCheckboxReturn<Values, Name>) => ReactNode;
}

export interface CreateFormHTMLCheckboxDependencies<Values> {
  useHTMLCheckbox: <Name extends ValuesFields<Values>>(arg: UseHTMLCheckboxArg<Name>) => UseHTMLCheckboxReturn<Values, Name>;
}

export const createFormHTMLCheckbox = <Values extends unknown>({
  useHTMLCheckbox,
}: CreateFormHTMLCheckboxDependencies<Values>) => {
  const FormHTMLCheckbox = <Name extends ValuesFields<Values>>({ children, ...rest }: FormHTMLCheckboxProps<Values, Name>) => {
    const arg = useHTMLCheckbox<Name>(rest);

    return useMemo(() => (
      <>
        {children(arg)}
      </>
    ), [children, arg])
  };

  return memo(FormHTMLCheckbox) as typeof FormHTMLCheckbox;
};
