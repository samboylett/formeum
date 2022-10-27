import { useState } from "react";

export interface UseFormHandlerArg<Values> {
  initialValues: Values;
}

export interface UseFormHandlerReturn<Values> {
  values: Values;
  setValues: (values: Values) => void;
  errors: any;
  setErrors: (errors: any) => void;
}

export const createUseFormHandler = <Values>() => {
  const useFormHandler = ({ initialValues }: UseFormHandlerArg<Values>): UseFormHandlerReturn<Values> => {
    const [values, setValues] = useState<Values>(initialValues);
    const [errors, setErrors] = useState<any>({});

    return {
      values,
      setValues,
      errors,
      setErrors,
    };
  };

  return useFormHandler;
};
