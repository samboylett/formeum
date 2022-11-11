import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFormHandlerStatelessArg, UseFormHandlerStatelessReturn } from "../../lib";
import {
  TestForm,
  TestFormValues,
  createTestProvider,
  TestProviderHandler,
  getInitialValues,
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

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<
      UseFormHandlerStatelessReturn<TestFormValues>,
      UseFormHandlerStatelessArg<TestFormValues>
      >(TestForm.useFormHandlerStateless, {
        initialProps: {
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
        },
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
  });
});
