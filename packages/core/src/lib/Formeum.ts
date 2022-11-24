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
 * Generate a typed formeum object context, hooks and components
 */
export class Formeum<Values> {
  readonly #cache: Partial<Record<keyof Formeum<Values>, any>> = {};

  #getItemFromCache<Key extends keyof Formeum<Values>, T>(
    name: Key,
    backup: () => T
  ): T {
    return (this.#cache[name] = this.#cache[name] || backup());
  }

  get ContextMain() {
    return this.#getItemFromCache("ContextMain", () =>
      createContextMain<Values>()
    );
  }

  get useMainContext() {
    return this.#getItemFromCache("useMainContext", () =>
      createUseMainContext<Values>(this)
    );
  }

  get useCurrentContext() {
    return this.#getItemFromCache("useCurrentContext", () =>
      createUseCurrentContext<Values>(this)
    );
  }

  get useFormHandlerStateless() {
    return this.#getItemFromCache("useFormHandlerStateless", () =>
      createUseFormHandlerStateless<Values>()
    );
  }

  get useFormHandler() {
    return this.#getItemFromCache("useFormHandler", () =>
      createUseFormHandler<Values>(this)
    );
  }

  get useFieldTouched() {
    return this.#getItemFromCache("useFieldTouched", () =>
      createUseFieldTouched<Values>(this)
    );
  }

  get useFieldChangeValue() {
    return this.#getItemFromCache("useFieldChangeValue", () =>
      createUseFieldChangeValue<Values>(this)
    );
  }

  get useFieldValue() {
    return this.#getItemFromCache("useFieldValue", () =>
      createUseFieldValue<Values>(this)
    );
  }

  get useFieldError() {
    return this.#getItemFromCache("useFieldError", () =>
      createUseFieldError<Values>(this)
    );
  }

  get useChangeHandler() {
    return this.#getItemFromCache("useChangeHandler", () =>
      createUseChangeHandler<Values>(this)
    );
  }

  get useFieldBlur() {
    return this.#getItemFromCache("useFieldBlur", () =>
      createUseFieldBlur<Values>(this)
    );
  }

  get useFieldDisabled() {
    return this.#getItemFromCache("useFieldDisabled", () =>
      createUseFieldDisabled<Values>(this)
    );
  }

  get useFieldFocus() {
    return this.#getItemFromCache("useFieldFocus", () =>
      createUseFieldFocus<Values>(this)
    );
  }

  get useFieldRef() {
    return this.#getItemFromCache("useFieldRef", () =>
      createUseFieldRef<Values>(this)
    );
  }

  get useHTMLInput() {
    return this.#getItemFromCache("useHTMLInput", () =>
      createUseHTMLInput<Values>(this)
    );
  }

  get useHTMLCheckbox() {
    return this.#getItemFromCache("useHTMLCheckbox", () =>
      createUseHTMLCheckbox<Values>(this)
    );
  }

  get useReactInput() {
    return this.#getItemFromCache("useReactInput", () =>
      createUseReactInput<Values>(this)
    );
  }

  get useFormCallbacks() {
    return this.#getItemFromCache("useFormCallbacks", () =>
      createUseFormCallbacks<Values>(this)
    );
  }

  get FormHandler() {
    return this.#getItemFromCache("FormHandler", () =>
      createFormHandler<Values>(this)
    );
  }

  get FormHandlerStateless() {
    return this.#getItemFromCache("FormHandlerStateless", () =>
      createFormHandlerStateless<Values>(this)
    );
  }

  get FormValues() {
    return this.#getItemFromCache("FormValues", () =>
      createFormValues<Values>(this)
    );
  }

  get FormHTMLInput() {
    return this.#getItemFromCache("FormHTMLInput", () =>
      createFormHTMLInput<Values>(this)
    );
  }

  get FormHTMLCheckbox() {
    return this.#getItemFromCache("FormHTMLCheckbox", () =>
      createFormHTMLCheckbox<Values>(this)
    );
  }

  get FormReactInput() {
    return this.#getItemFromCache("FormReactInput", () =>
      createFormReactInput<Values>(this)
    );
  }

  get FormCallbacks() {
    return this.#getItemFromCache("FormCallbacks", () =>
      createFormCallbacks<Values>(this)
    );
  }
}
