import { createFormField } from "./components/FormField";
import { createFormHandler } from "./components/FormHandler";
import { createFormValues } from "./components/FormValues";
import { createContextErrors } from "./contexts/ContextErrors";
import { createContextMain } from "./contexts/ContextMain";
import { createContextValues } from "./contexts/ContextValues";
import { createUseChangeHandler } from "./hooks/useChangeHandler";
import { createUseErrorsContext } from "./hooks/useErrorsContext";
import { createUseField } from "./hooks/useField";
import { createUseFieldError } from "./hooks/useFieldError";
import { createUseFieldValue } from "./hooks/useFieldValue";
import { createUseFormHandler } from "./hooks/useFormHandler";
import { createUseGetFormContexts } from "./hooks/useGetFormContexts";
import { createUseMainContext } from "./hooks/useMainContext";
import { createUseValuesContext } from "./hooks/useValuesContext";
import { CreateFormArg } from "./types/CreateFormArg";

export function createForm<Values extends unknown>(arg: CreateFormArg) {
  const ContextMain = createContextMain<Values>();
  const ContextValues = createContextValues<Values>();
  const ContextErrors = createContextErrors<Values>();

  const useMainContext = createUseMainContext<Values>({ ContextMain });
  const useValuesContext = createUseValuesContext<Values>({ ContextValues });
  const useErrorsContext = createUseErrorsContext<Values>({ ContextErrors });
  const useFormHandler = createUseFormHandler<Values>();
  const useGetFormContexts = createUseGetFormContexts<Values>();
  const useFieldValue = createUseFieldValue<Values>({ useMainContext });
  const useFieldError = createUseFieldError<Values>({ useMainContext });
  const useChangeHandler = createUseChangeHandler<Values>({ useFieldValue });
  const useField = createUseField<Values>({ useFieldValue, useFieldError, useChangeHandler });

  const FormHandler = createFormHandler<Values>(arg, {
    ContextMain,
    ContextValues,
    ContextErrors,
    useFormHandler,
    useGetFormContexts,
  });

  const FormField = createFormField<Values>(arg, { useField });
  const FormValues = createFormValues<Values>({ useValuesContext });

  return {
    useMainContext,
    useFormHandler,
    useGetFormContexts,
    useField,
    useValuesContext,
    useErrorsContext,
    useFieldError,
    useFieldValue,
    useChangeHandler,

    ContextMain,
    ContextValues,
    ContextErrors,

    FormHandler,
    FormField,
    FormValues,
  } as const;
}
