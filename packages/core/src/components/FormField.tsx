import { memo, ReactElement, ReactNode, useMemo } from "react";
import { UseFieldArg, UseFieldReturn } from "../hooks/useField";
import { ValuesFields } from "../types/ValuesFields";

export interface FormFieldProps<Values, Name extends ValuesFields<Values>> extends UseFieldArg<Name> {
  children: (arg: UseFieldReturn<Values, Name>) => ReactNode;
}

export interface CreateFormFieldDependencies<Values> {
  useField: <Name extends ValuesFields<Values>>(arg: UseFieldArg<Name>) => UseFieldReturn<Values, Name>;
}

export const createFormField = <Values extends unknown>({
  useField,
}: CreateFormFieldDependencies<Values>) => {
  /**
   * Get all logic handlers for a field.
   * 
   * @param {FormFieldProps<Values, Name>} props
   * @returns {ReactElement}
   */
  const FormField = <Name extends ValuesFields<Values>>({ children, ...rest }: FormFieldProps<Values, Name>): ReactElement => {
    const arg = useField<Name>(rest);

    return useMemo(() => (
      <>
        {children(arg)}
      </>
    ), [children, arg])
  };

  return memo(FormField) as typeof FormField;
};
