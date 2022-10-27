import { ReactNode } from "react";
import { UseFieldArg, UseFieldReturn } from "../../hooks/useField";
import { CreateFormArg } from "../../types/CreateFormArg";
import { getComponentName } from "../../utils/getComponentName";
import { O } from 'ts-toolbelt';

export interface FormFieldProps<Values, Name extends string & O.Paths<Values>> extends UseFieldArg<Name> {
  children: (arg: UseFieldReturn<Values, Name>) => ReactNode;
}

export interface CreateFormFieldDependencies<Values> {
  useField: <Name extends string & O.Paths<Values>>(arg: UseFieldArg<Name>) => UseFieldReturn<Values, Name>;
}

export const createFormField = <Values extends unknown>(arg: CreateFormArg, {
  useField,
}: CreateFormFieldDependencies<Values>) => {
  const FormField = <Name extends string & O.Paths<Values>>({ children, ...rest }: FormFieldProps<Values, Name>) => {
    const arg = useField<Name>(rest);

    return (
      <>
        {children(arg)}
      </>
    )
  };

  FormField.name = getComponentName(arg, FormField);

  return FormField;
};
