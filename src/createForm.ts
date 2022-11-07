import { createFormField } from "./components/FormField";
import { createFormHandler } from "./components/FormHandler";
import { createFormValues } from "./components/FormValues";
import { createContextMain } from "./contexts/ContextMain";
import { createUseChangeHandler } from "./hooks/useChangeHandler";
import { createUseField } from "./hooks/useField";
import { createUseFieldError } from "./hooks/useFieldError";
import { createUseFieldTouched } from "./hooks/useFieldTouched";
import { createUseFieldValue } from "./hooks/useFieldValue";
import { createUseFormHandler } from "./hooks/useFormHandler";
import { createUseMainContext } from "./hooks/useMainContext";

export function createForm<Values extends unknown>() {
  const ContextMain = createContextMain<Values>();

  const useMainContext = createUseMainContext<Values>({ ContextMain });
  const useFormHandler = createUseFormHandler<Values>();
  const useFieldTouched = createUseFieldTouched<Values>({ useMainContext });
  const useFieldValue = createUseFieldValue<Values>({ useMainContext, useFieldTouched });
  const useFieldError = createUseFieldError<Values>({ useMainContext });
  const useChangeHandler = createUseChangeHandler<Values>({ useFieldValue });
  const useField = createUseField<Values>({ useFieldValue, useFieldError, useChangeHandler, useFieldTouched });

  const FormHandler = createFormHandler<Values>({
    useFormHandler,
    ContextMain,
  });

  const FormField = createFormField<Values>({ useField });
  const FormValues = createFormValues<Values>({ useMainContext });

  return {
    useMainContext,
    useFormHandler,
    useField,
    useFieldError,
    useFieldValue,
    useFieldTouched,
    useChangeHandler,

    ContextMain,

    FormHandler,
    FormField,
    FormValues,
  } as const;
}
