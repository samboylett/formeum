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
export class Formeum<
  Values,
  ExtraContext extends Record<string, unknown> = Record<never, never>
> {
  readonly #cache: Partial<Record<keyof Formeum<Values>, any>> = {};
  readonly #extraContextDefault: ExtraContext;

  constructor(extraContextDefault: ExtraContext) {
    this.#extraContextDefault = extraContextDefault;
  }

  #getItemFromCache<Key extends keyof Formeum<Values>, T>(
    name: Key,
    backup: () => T
  ): T {
    return (this.#cache[name] = this.#cache[name] || backup());
  }

  get ContextMain() {
    return this.#getItemFromCache("ContextMain", () =>
      createContextMain<Values, ExtraContext>(this.#extraContextDefault)
    );
  }

  get useMainContext() {
    return this.#getItemFromCache("useMainContext", () =>
      createUseMainContext<Values, ExtraContext>(this)
    );
  }

  get useCurrentContext() {
    return this.#getItemFromCache("useCurrentContext", () =>
      createUseCurrentContext<Values, ExtraContext>(this)
    );
  }

  get useFormHandlerStateless() {
    return this.#getItemFromCache("useFormHandlerStateless", () =>
      createUseFormHandlerStateless<Values, ExtraContext>({
        defaultContext: this.#extraContextDefault,
      })
    );
  }

  get useFormHandler() {
    return this.#getItemFromCache("useFormHandler", () =>
      createUseFormHandler<Values, ExtraContext>(this)
    );
  }

  get useFieldTouched() {
    return this.#getItemFromCache("useFieldTouched", () =>
      createUseFieldTouched<Values, ExtraContext>(this)
    );
  }

  get useFieldChangeValue() {
    return this.#getItemFromCache("useFieldChangeValue", () =>
      createUseFieldChangeValue<Values, ExtraContext>(this)
    );
  }

  get useFieldValue() {
    return this.#getItemFromCache("useFieldValue", () =>
      createUseFieldValue<Values, ExtraContext>(this)
    );
  }

  get useFieldError() {
    return this.#getItemFromCache("useFieldError", () =>
      createUseFieldError<Values, ExtraContext>(this)
    );
  }

  get useChangeHandler() {
    return this.#getItemFromCache("useChangeHandler", () =>
      createUseChangeHandler<Values>(this)
    );
  }

  get useFieldBlur() {
    return this.#getItemFromCache("useFieldBlur", () =>
      createUseFieldBlur<Values, ExtraContext>(this)
    );
  }

  get useFieldDisabled() {
    return this.#getItemFromCache("useFieldDisabled", () =>
      createUseFieldDisabled<Values, ExtraContext>(this)
    );
  }

  get useFieldFocus() {
    return this.#getItemFromCache("useFieldFocus", () =>
      createUseFieldFocus<Values, ExtraContext>(this)
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
      createUseFormCallbacks<Values, ExtraContext>(this)
    );
  }

  get FormHandler() {
    return this.#getItemFromCache("FormHandler", () =>
      createFormHandler<Values, ExtraContext>(this)
    );
  }

  get FormHandlerStateless() {
    return this.#getItemFromCache("FormHandlerStateless", () =>
      createFormHandlerStateless<Values, ExtraContext>(this)
    );
  }

  get FormValues() {
    return this.#getItemFromCache("FormValues", () =>
      createFormValues<Values, ExtraContext>(this)
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
      createFormCallbacks<Values, ExtraContext>(this)
    );
  }
}
