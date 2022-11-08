import { createFormField } from "./components/FormField";
import { createFormHandler } from "./components/FormHandler";
import { createFormValues } from "./components/FormValues";
import { createContextMain } from "./contexts/ContextMain";
import { createUseChangeHandler } from "./hooks/useChangeHandler";
import { createUseCurrentContext } from "./hooks/useCurrentContext";
import { createUseField } from "./hooks/useField";
import { createUseFieldBlur } from "./hooks/useFieldBlur";
import { createUseFieldChangeValue } from "./hooks/useFieldChangeValue";
import { createUseFieldError } from "./hooks/useFieldError";
import { createUseFieldFocus } from "./hooks/useFieldFocus";
import { createUseFieldTouched } from "./hooks/useFieldTouched";
import { createUseFieldValue } from "./hooks/useFieldValue";
import { createUseFormHandler } from "./hooks/useFormHandler";
import { createUseFormHandlerStateless } from "./hooks/useFormHandlerStateless";
import { createUseHTMLCheckbox } from "./hooks/useHTMLCheckbox";
import { createUseHTMLInput } from "./hooks/useHTMLInput";
import { createUseMainContext } from "./hooks/useMainContext";

/**
 * Create fully typed context, hooks and components for a form based on the generic type argument.
 */
export function createForm<Values extends unknown>() {
  const ContextMain = createContextMain<Values>();

  const useMainContext = createUseMainContext<Values>({ ContextMain });
  const useCurrentContext = createUseCurrentContext<Values>({ ContextMain });
  const useFormHandlerStateless = createUseFormHandlerStateless<Values>();
  const useFormHandler = createUseFormHandler<Values>({ useFormHandlerStateless });
  const useFieldTouched = createUseFieldTouched<Values>({ useMainContext });
  const useFieldChangeValue = createUseFieldChangeValue<Values>({ useFieldTouched, useCurrentContext });
  const useFieldValue = createUseFieldValue<Values>({ useMainContext, useFieldChangeValue });
  const useFieldError = createUseFieldError<Values>({ useMainContext });
  const useChangeHandler = createUseChangeHandler<Values>({ useFieldChangeValue });
  const useFieldBlur = createUseFieldBlur<Values>({ useCurrentContext, useFieldTouched });
  const useFieldFocus = createUseFieldFocus<Values>({ useCurrentContext, useFieldTouched });
  const useField = createUseField<Values>({ useFieldValue, useFieldError, useChangeHandler, useFieldTouched, useFieldBlur, useFieldFocus });
  const useHTMLInput = createUseHTMLInput<Values>({ useFieldValue, useFieldFocus, useFieldBlur, useChangeHandler });
  const useHTMLCheckbox = createUseHTMLCheckbox<Values>({ useFieldValue, useFieldFocus, useFieldBlur, useChangeHandler });

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
    useCurrentContext,
    useFieldBlur,
    useFieldFocus,
    useHTMLInput,
    useHTMLCheckbox,

    ContextMain,

    FormHandler,
    FormField,
    FormValues,
  } as const;
}
