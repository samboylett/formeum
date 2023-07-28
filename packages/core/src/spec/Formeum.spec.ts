import { Formeum } from "../lib";

describe("Formeum", () => {
  let formeum: Formeum<{}>;

  beforeEach(() => {
    formeum = new Formeum<{}>({});
  });

  test.each<keyof Formeum<{}>>([
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
