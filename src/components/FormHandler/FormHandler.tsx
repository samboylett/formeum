import React, { ReactNode, useRef, useState } from "react";
import { ContextMain } from "../../contexts/ContextMain";
import { CreateFormArg } from "../../types/CreateFormArg";
import { getComponentName } from "../../utils/getComponentName";

export interface FormHandlerProps<Values extends unknown> {
  initialValues: Values;
  children: ReactNode;
}

export const FormHandler = <Values extends unknown>({ initialValues, children }: FormHandlerProps<Values>) => {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<any>({});

  const nextContext = {
    values,
    setValues,
    errors,
    setErrors,
  } as const;

  const context = useRef<typeof nextContext>(nextContext);
  Object.assign(context.current, nextContext);

  return (
    <ContextMain.Provider value={context.current}>
      {children}
    </ContextMain.Provider>
  )
};

export const createFormHandler = <Values extends unknown>(arg: CreateFormArg) => {
  const FormHandlerComponent = (props: FormHandlerProps<Values>) => <FormHandler<Values> {...props} />;

  FormHandlerComponent.name = getComponentName(arg, FormHandler);

  return FormHandlerComponent;
};
