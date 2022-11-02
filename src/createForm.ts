import { createFormField } from "./components/FormField";
import { createFormHandler } from "./components/FormHandler";
import { createContextErrors } from "./contexts/ContextErrors";
import { createContextMain } from "./contexts/ContextMain";
import { createContextValues } from "./contexts/ContextValues";
import { createUseField } from "./hooks/useField";
import { createUseFieldValue } from "./hooks/useFieldValue";
import { createUseFormHandler } from "./hooks/useFormHandler";
import { createUseGetFormContexts } from "./hooks/useGetFormContexts";
import { createUseMainContext } from "./hooks/useMainContext";
import { CreateFormArg } from "./types/CreateFormArg";

export function createForm<Values extends unknown>(arg: CreateFormArg) {
  const ContextMain = createContextMain<Values>();
  const ContextValues = createContextValues<Values>();
  const ContextErrors = createContextErrors<Values>();

  const useMainContext = createUseMainContext<Values>({ ContextMain });
  const useFormHandler = createUseFormHandler<Values>();
  const useGetFormContexts = createUseGetFormContexts<Values>();
  const useFieldValue = createUseFieldValue<Values>({ useMainContext });
  const useField = createUseField<Values>({ useMainContext, useFieldValue });

  const FormHandler = createFormHandler<Values>(arg, {
    ContextMain,
    ContextValues,
    ContextErrors,
    useFormHandler,
    useGetFormContexts,
  });

  const FormField = createFormField<Values>(arg, { useField });

  return {
    useMainContext,
    useFormHandler,
    useGetFormContexts,
    useField,

    ContextMain,
    ContextValues,
    ContextErrors,
    FormHandler,
    FormField,
  } as const;
}
