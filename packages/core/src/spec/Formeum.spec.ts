import { Formeum } from "../lib";

describe("Formeum", () => {
  let formeum: Formeum<null>;

  beforeEach(() => {
    formeum = new Formeum<null>({});
  });

  test.each<keyof Formeum<null>>([
    "ContextMain",
    "useMainContext",
    "useCurrentContext",
    "useFormHandlerStateless",
    "useFormHandler",
    "useFieldTouched",
    "useFieldChangeValue",
    "useFieldValue",
    "useFieldError",
    "useChangeHandler",
    "useFieldBlur",
    "useFieldDisabled",
    "useFieldFocus",
    "useFieldRef",
    "useHTMLInput",
    "useHTMLCheckbox",
    "useReactInput",
    "useFormCallbacks",
    "FormHandler",
    "FormHandlerStateless",
    "FormValues",
    "FormHTMLInput",
    "FormHTMLCheckbox",
    "FormReactInput",
    "FormCallbacks",
  ])("the %s getter is cached after first get", (key) => {
    expect(formeum[key]).toBe(formeum[key]);
  });
});
