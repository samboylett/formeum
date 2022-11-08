import { ReactNode, useMemo } from "react";
import { FastContext } from 'react-fast-context';
import { ContextMainInterface } from "../contexts/ContextMain";
import { UseFormHandlerArg, UseFormHandlerReturn } from "../hooks/useFormHandler";

export interface FormHandlerProps<Values> {
  initialValues: Values;
  children: ReactNode;
}

export interface CreateFormHandlerDependencies<Values> {
  ContextMain: FastContext<ContextMainInterface<Values>>;
  useFormHandler: (arg: UseFormHandlerArg<Values>) => UseFormHandlerReturn<Values>;
}

export const createFormHandler = <Values extends unknown>({
  ContextMain,
  useFormHandler,
}: CreateFormHandlerDependencies<Values>) => {
  const FormHandler = ({ initialValues, children }: FormHandlerProps<Values>) => {
    const handler = useFormHandler({ initialValues });

    return (
      <ContextMain.Provider value={handler}>
        {useMemo(() => children, [children])}
      </ContextMain.Provider>
    )
  };

  return FormHandler;
};
