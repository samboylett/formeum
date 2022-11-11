import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFormHandlerStatelessArg, UseFormHandlerStatelessReturn } from "../../lib";
import {
  TestForm,
  TestFormValues,
  createTestProvider,
  TestProviderHandler,
  getInitialValues,
  getFilledValues,
} from "../TestForm";

describe("useFormHandlerStateless", () => {
  test("is a function", () => {
    expect(TestForm.useFormHandlerStateless).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFormHandlerStatelessReturn<TestFormValues>,
      UseFormHandlerStatelessArg<TestFormValues>
    >;
    let provider: TestProviderHandler;
    let initialProps: UseFormHandlerStatelessArg<TestFormValues>;

    beforeEach(() => {
      provider = createTestProvider();
      initialProps = {
        onValues: jest.fn(),
        onErrors: jest.fn(),
        onIsSubmitting: jest.fn(),
        onSubmit: jest.fn(),
        onTouched: jest.fn(),
        initialValues: getInitialValues(),
        values: getInitialValues(),
        errors: {},
        touched: new Set([]),
        isSubmitting: false,
      };

      hook = renderHook<
      UseFormHandlerStatelessReturn<TestFormValues>,
      UseFormHandlerStatelessArg<TestFormValues>
      >(TestForm.useFormHandlerStateless, {
        initialProps,
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test.each([
      ["values", getInitialValues()],
      ["initialValues", getInitialValues()],
      ["errors", {}],
      ["touched", new Set([])],
      ["touchOnChange", true],
      ["touchOnBlur", true],
      ["touchOnFocus", false],
      ["validateOnBlur", true],
      ["validateOnChange", false],
      ["validateOnFocus", false],
      ["validateOnMount", false],
      ["validateOnSubmit", true],
      ["isSubmitting", false],
      ["disabledWhileSubmitting", false],
    ] as const)("returns %s as %j", (prop, value) => {
      expect(hook.result.current).toEqual(
        expect.objectContaining({
          [prop]: value,
        })
      );
    });

    describe.each([
      ["initialValues", getFilledValues()],
      ["values", getFilledValues()],
      ["touched", new Set(["stringField"])],
      ["errors", { stringField: "foo" }],
      ["isSubmitting", true],
    ] as const)("when %s changed", (attribute, newValue) => {
      beforeEach(() => {
        hook.rerender({
          ...initialProps,
          [attribute]: newValue,
        })
      });

      test(`returns ${attribute} as new value`, () => {
        expect(hook.result.current).toEqual(
          expect.objectContaining({
            [attribute]: newValue,
          })
        );
      });
    });

    describe.each([
      "touchOnChange",
      "touchOnBlur",
      "touchOnFocus",
      "validateOnBlur",
      "validateOnChange",
      "validateOnFocus",
      "validateOnMount",
      "validateOnSubmit",
      "disabledWhileSubmitting",
    ] as const)("when %s config set", (configName) => {
      describe.each([true, false] as const)("to %j", (configValue) => {
        beforeEach(() => {
          hook.rerender({
            ...initialProps,
            [configName]: configValue,
          })
        });

        test.each([[configName, configValue]] as const)("returns %s as %j", () => {
          expect(hook.result.current).toEqual(
            expect.objectContaining({
              [configName]: configValue,
            })
          );
        });
      });
    });
  });
});
