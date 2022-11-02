import { memo, ReactNode, useMemo } from "react";
import { UseValuesContextReturn } from "../hooks/useValuesContext";

export interface FormValuesProps<Values> {
  children: (arg: Values) => ReactNode;
}

export interface CreateFormValuesDependencies<Values> {
  useValuesContext: () => UseValuesContextReturn<Values>;
}

export const createFormValues = <Values extends unknown>({
  useValuesContext,
}: CreateFormValuesDependencies<Values>) => {
  const FormValues = ({ children }: FormValuesProps<Values>) => {
    const { values } = useValuesContext();

    return useMemo(() => (
      <>
        {children(values)}
      </>
    ), [children, values])
  };

  return memo(FormValues) as typeof FormValues;
};
