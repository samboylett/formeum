import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseHTMLInputArg, UseHTMLInputReturn } from "../../lib";
import {
  TestForm,
  TestFormValues,
  createTestProvider,
  TestProviderHandler,
} from "../TestForm";

describe("useHTMLInput", () => {
  test("is a function", () => {
    expect(TestForm.useHTMLInput).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseHTMLInputReturn<TestFormValues, "stringField">,
      UseHTMLInputArg<TestFormValues, "stringField">
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<
        UseHTMLInputReturn<TestFormValues, "stringField">,
        UseHTMLInputArg<TestFormValues, "stringField">
      >(TestForm.useHTMLInput, {
        initialProps: {
          name: "stringField",
        },
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test.each([
      ["value", ""],
      ["disabled", false],
      ["name", "stringField"],
      ["ref", { current: null }]
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
