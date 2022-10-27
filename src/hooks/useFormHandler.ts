import { useState } from "react";
import { O } from 'ts-toolbelt';
import { FormErrors } from "../types/FormErrors";

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
    const [errors, setErrors] = useState<FormErrors<Values extends {} ? Values : {}>>({});

    return {
      values,
      setValues,
      errors,
      setErrors,
    };
  };

  return useFormHandler;
};
