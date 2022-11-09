import { isEqual } from "lodash";
import { memo, ReactElement, ReactNode, useMemo } from "react";
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
  /**
   * Get all the form values.
   * 
   * @param {FormValuesProps<Values>} props
   * @returns {ReactElement}
   */
  const FormValues = ({ children }: FormValuesProps<Values>): ReactElement => {
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
