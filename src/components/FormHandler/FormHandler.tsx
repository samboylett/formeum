import React, { Context, ReactNode } from "react";
import { ContextErrorsInterface } from "../../contexts/ContextErrors";
import { ContextMainInterface } from "../../contexts/ContextMain";
import { ContextValuesInterface } from "../../contexts/ContextValues";
import { UseFormHandlerArg, UseFormHandlerReturn } from "../../hooks/useFormHandler";
import { UseGetFormContextsArg, UseGetFormContextsReturn } from "../../hooks/useGetFormContexts";
import { CreateFormArg } from "../../types/CreateFormArg";
import { getComponentName } from "../../utils/getComponentName";

export interface FormHandlerProps<Values> {
  initialValues: Values;
  children: ReactNode;
}

export interface CreateFormHandlerDependencies<Values> {
  ContextMain: Context<ContextMainInterface<Values>>;
  ContextValues: Context<ContextValuesInterface<Values>>;
  ContextErrors: Context<ContextErrorsInterface<Values>>;
  useFormHandler: (arg: UseFormHandlerArg<Values>) => UseFormHandlerReturn<Values>;
  useGetFormContexts: (arg: UseGetFormContextsArg<Values>) => UseGetFormContextsReturn<Values>;
}

export const createFormHandler = <Values extends unknown>(arg: CreateFormArg, {
  ContextMain,
  ContextValues,
  ContextErrors,
  useFormHandler,
  useGetFormContexts,
}: CreateFormHandlerDependencies<Values>) => {
  const FormHandler = ({ initialValues, children }: FormHandlerProps<Values>) => {
    const handler = useFormHandler({ initialValues });
    const {
      mainContext,
      valuesContext,
      errorsContext,
    } = useGetFormContexts({ handler });

    return (
      <ContextMain.Provider value={mainContext}>
        <ContextValues.Provider value={valuesContext}>
          <ContextErrors.Provider value={errorsContext}>
            {children}
          </ContextErrors.Provider>
        </ContextValues.Provider>
      </ContextMain.Provider>
    )
  };

  FormHandler.name = getComponentName(arg, FormHandler);

  return FormHandler;
};
