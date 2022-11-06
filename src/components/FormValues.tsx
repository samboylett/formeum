import { isEqual } from "lodash";
import { memo, ReactNode, useMemo } from "react";
import { UseMainContextArg, UseMainContextReturn } from "../hooks/useMainContext";

export interface FormValuesProps<Values> {
  children: (arg: Values) => ReactNode;
}

export interface CreateFormValuesDependencies<Values> {
  useMainContext: (arg: UseMainContextArg<Values>) => UseMainContextReturn<Values>;
}

export const createFormValues = <Values extends unknown>({
  useMainContext,
}: CreateFormValuesDependencies<Values>) => {
  const FormValues = ({ children }: FormValuesProps<Values>) => {
    const { values } = useMainContext({
      shouldUpdate: (oldValue, newValue) => !isEqual(oldValue.values, newValue.values),
    });

    return useMemo(() => (
      <>
        {children(values)}
      </>
    ), [children, values])
  };

  return memo(FormValues) as typeof FormValues;
};
