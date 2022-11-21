import { createFormCallbacks } from "./components/FormCallbacks";
import { createFormHandler } from "./components/FormHandler";
import { createFormHandlerStateless } from "./components/FormHandlerStateless";
import { createFormHTMLCheckbox } from "./components/FormHTMLCheckbox";
import { createFormHTMLInput } from "./components/FormHTMLInput";
import { createFormReactInput } from "./components/FormReactInput";
import { createFormValues } from "./components/FormValues";
import { createContextMain } from "./contexts/ContextMain";
import { createUseChangeHandler } from "./hooks/useChangeHandler";
import { createUseCurrentContext } from "./hooks/useCurrentContext";
import { createUseFieldBlur } from "./hooks/useFieldBlur";
import { createUseFieldChangeValue } from "./hooks/useFieldChangeValue";
import { createUseFieldDisabled } from "./hooks/useFieldDisabled";
import { createUseFieldError } from "./hooks/useFieldError";
import { createUseFieldFocus } from "./hooks/useFieldFocus";
import { createUseFieldRef } from "./hooks/useFieldRef";
import { createUseFieldTouched } from "./hooks/useFieldTouched";
import { createUseFieldValue } from "./hooks/useFieldValue";
import { createUseFormCallbacks } from "./hooks/useFormCallbacks";
import { createUseFormHandler } from "./hooks/useFormHandler";
import { createUseFormHandlerStateless } from "./hooks/useFormHandlerStateless";
import { createUseHTMLCheckbox } from "./hooks/useHTMLCheckbox";
import { createUseHTMLInput } from "./hooks/useHTMLInput";
import { createUseMainContext } from "./hooks/useMainContext";
import { createUseReactInput } from "./hooks/useReactInput";

/**
 * @private
 */
export function createBaseForm<Values extends unknown>() {
  const ContextMain = createContextMain<Values>();

  const useMainContext = createUseMainContext<Values>({ ContextMain });
  const useCurrentContext = createUseCurrentContext<Values>({ ContextMain });
  const useFormHandlerStateless = createUseFormHandlerStateless<Values>();
  const useFormHandler = createUseFormHandler<Values>({
    useFormHandlerStateless,
  });
  const useFieldTouched = createUseFieldTouched<Values>({ useMainContext });
  const useFieldChangeValue = createUseFieldChangeValue<Values>({
    useFieldTouched,
    useCurrentContext,
  });
  const useFieldValue = createUseFieldValue<Values>({
    useMainContext,
    useFieldChangeValue,
  });
  const useFieldError = createUseFieldError<Values>({ useMainContext });
  const useChangeHandler = createUseChangeHandler<Values>({
    useFieldChangeValue,
  });
  const useFieldBlur = createUseFieldBlur<Values>({
    useCurrentContext,
    useFieldTouched,
  });
  const useFieldDisabled = createUseFieldDisabled<Values>({ useMainContext });
  const useFieldFocus = createUseFieldFocus<Values>({
    useCurrentContext,
    useFieldTouched,
  });
  const useFieldRef = createUseFieldRef<Values>({ useFieldError });
  const useHTMLInput = createUseHTMLInput<Values>({
    useFieldValue,
    useFieldFocus,
    useFieldBlur,
    useChangeHandler,
    useFieldRef,
    useFieldDisabled,
  });
  const useHTMLCheckbox = createUseHTMLCheckbox<Values>({
    useFieldValue,
    useFieldFocus,
    useFieldBlur,
    useChangeHandler,
    useFieldRef,
    useFieldDisabled,
  });
  const useReactInput = createUseReactInput<Values>({
    useFieldBlur,
    useFieldFocus,
    useFieldValue,
    useFieldRef,
    useFieldDisabled,
  });
  const useFormCallbacks = createUseFormCallbacks<Values>({
    useCurrentContext,
  });

  const FormHandler = createFormHandler<Values>({
    useFormHandler,
    ContextMain,
  });

  const FormHandlerStateless = createFormHandlerStateless<Values>({
    useFormHandlerStateless,
    ContextMain,
  });

  const FormValues = createFormValues<Values>({ useMainContext });
  const FormHTMLInput = createFormHTMLInput<Values>({ useHTMLInput });
  const FormHTMLCheckbox = createFormHTMLCheckbox<Values>({ useHTMLCheckbox });
  const FormReactInput = createFormReactInput<Values>({ useReactInput });
  const FormCallbacks = createFormCallbacks<Values>({ useFormCallbacks });

  return {
    useMainContext,
    useFormHandler,
    useFormHandlerStateless,
    useFieldError,
    useFieldValue,
    useFieldTouched,
    useChangeHandler,
    useCurrentContext,
    useFieldBlur,
    useFieldFocus,
    useHTMLInput,
    useHTMLCheckbox,
    useReactInput,
    useFormCallbacks,
    useFieldRef,
    useFieldDisabled,
    useFieldChangeValue,

    ContextMain,

    FormHandler,
    FormHandlerStateless,
    FormValues,
    FormHTMLInput,
    FormHTMLCheckbox,
    FormReactInput,
    FormCallbacks,
  } as const;
}
