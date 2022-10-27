import React, { Context, ReactNode, useMemo, useRef, useState } from "react";
import { ContextMainInterface } from "../../contexts/ContextMain";
import { ContextValuesInterface } from "../../contexts/ContextValues";
import { UseFormHandlerArg, UseFormHandlerReturn } from "../../hooks/useFormHandler";
import { CreateFormArg } from "../../types/CreateFormArg";
import { getComponentName } from "../../utils/getComponentName";

export interface FormHandlerProps<Values> {
  initialValues: Values;
  children: ReactNode;
}

export interface CreateFormHandlerDependencies<Values> {
  ContextMain: Context<ContextMainInterface<Values>>;
  ContextValues: Context<ContextValuesInterface<Values>>;
  useFormHandler: (arg: UseFormHandlerArg<Values>) => UseFormHandlerReturn<Values>;
}

export const createFormHandler = <Values extends unknown>(arg: CreateFormArg, {
  ContextMain,
  ContextValues,
  useFormHandler,
}: CreateFormHandlerDependencies<Values>) => {
  const FormHandler = ({ initialValues, children }: FormHandlerProps<Values>) => {
    const {
      values,
      setValues,
      errors,
      setErrors,
    } = useFormHandler({ initialValues });

    const valuesContext: ContextValuesInterface<Values> = useMemo(() => ({
      values,
      setValues,
    }), [values, setValues]);

    const nextContext = {
      ...valuesContext,
      errors,
      setErrors,
    } as const;

    const context = useRef<typeof nextContext>(nextContext);
    Object.assign(context.current, nextContext);

    return (
      <ContextMain.Provider value={context.current}>
        <ContextValues.Provider value={valuesContext}>
          {children}
        </ContextValues.Provider>
      </ContextMain.Provider>
    )
  };

  FormHandler.name = getComponentName(arg, FormHandler);

  return FormHandler;
};
