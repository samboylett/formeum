import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseHTMLCheckboxArg, UseHTMLCheckboxReturn } from "../../lib";
import {
  TestForm,
  TestFormValues,
  createTestProvider,
  TestProviderHandler,
} from "../TestForm";

describe("useHTMLCheckbox", () => {
  test("is a function", () => {
    expect(TestForm.useHTMLCheckbox).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseHTMLCheckboxReturn<TestFormValues, "booleanField">,
      UseHTMLCheckboxArg<TestFormValues, "booleanField">
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<
        UseHTMLCheckboxReturn<TestFormValues, "booleanField">,
        UseHTMLCheckboxArg<TestFormValues, "booleanField">
      >(TestForm.useHTMLCheckbox, {
        initialProps: {
          name: "booleanField",
        },
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test.each([
      ["value", "booleanField"],
      ["disabled", false],
      ["name", "booleanField"],
      ["checked", false],
      ["ref", { current: null }],
      ["type", "checkbox"],
    ] as const)("returns %s as %j", (prop, value) => {
      expect(hook.result.current).toEqual(
        expect.objectContaining({
          [prop]: value,
        })
      );
    });

    test.each([
      "onFocus",
      "onBlur",
      "onChange",
    ] as const)("returns the %s function", (prop) => {
      expect(hook.result.current).toEqual(
        expect.objectContaining({
          [prop]: expect.any(Function),
        })
      );
    });
  });
});
