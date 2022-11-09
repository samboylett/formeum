import { memo, ReactElement, ReactNode, useMemo } from "react";
import { UseFormCallbacksReturn } from "../hooks/useFormCallbacks";
import { ValuesFields } from "../types/ValuesFields";

export interface FormCallbacksProps<Values> {
  children: (arg: UseFormCallbacksReturn<Values>) => ReactNode;
}

export interface CreateFormCallbacksDependencies<Values> {
  useFormCallbacks: () => UseFormCallbacksReturn<Values>;
}

export const createFormCallbacks = <Values extends unknown>({
    useFormCallbacks,
}: CreateFormCallbacksDependencies<Values>) => {
    /**
     * Get all form handler functions.
     * @param {FormCallbacksProps<Values>} props 
     * @returns {ReactElement}
     */
  const FormCallbacks = ({ children }: FormCallbacksProps<Values>): ReactElement => {
    const arg = useFormCallbacks();

    return useMemo(() => (
      <>
        {children(arg)}
      </>
    ), [children, arg])
  };

  return memo(FormCallbacks) as typeof FormCallbacks;
};
