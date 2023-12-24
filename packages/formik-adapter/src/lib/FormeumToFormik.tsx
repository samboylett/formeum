import { FormikProvider, FormikContextType, FormikErrors, FormikTouched } from "formik";
import { ReactNode, useMemo } from "react";
import { Formeum, ValuesFields } from "@formeum/core";
import { set } from "lodash";

export interface FormeumToFormikProps<Values extends Record<never, unknown>> {
  children: ReactNode;
  formeum: Formeum<Values>;
}

export const FormeumToFormik = <Values extends Record<never, unknown>>({ children, formeum }: FormeumToFormikProps<Values>) => {
  const { useMainContext } = formeum;

  const {
    values,
    errors,
    touched,
    isSubmitting,
  } = useMainContext({
    shouldUpdate: () => true,
  });

  const formikErrors = useMemo<FormikErrors<Values>>(() => {
    const formikErrors: FormikErrors<Values> = {};

    Object.keys(errors).forEach((path: any) => {
      set(formikErrors, path, errors[path as ValuesFields<Values>]);
    });

    return formikErrors;
  }, []);

  const formikTouched = useMemo<FormikTouched<Values>>(() => {
    const formikTouched: FormikTouched<Values> = {};

    touched.forEach(path => {
      set(formikTouched, path, true);
    });

    return formikTouched;
  }, [touched]);

  const value = useMemo<FormikContextType<Values>>(() => ({
    values,
    errors: formikErrors,
    touched: formikTouched,
    isSubmitting,
    isValidating: false,
    submitCount: 0,
  }), [values, formikErrors]);

  return (
    <FormikProvider value={value}>
      {children}
    </FormikProvider>
  )
}
