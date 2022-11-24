import { renderHook, RenderHookResult } from "@testing-library/react";
import { FORM_CALLBACK_NAMES, UseFormCallbacksReturn } from "../../lib";
import {
  TestForm,
  TestFormValues,
  createTestProvider,
  TestProviderHandler,
} from "../TestForm";

describe("useFormCallbacks", () => {
  test("is a function", () => {
    expect(TestForm.useFormCallbacks).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<UseFormCallbacksReturn<TestFormValues, Record<never, never>>, void>;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<UseFormCallbacksReturn<TestFormValues, Record<never, never>>, void>(
        TestForm.useFormCallbacks,
        {
          wrapper: ({ children }) => (
            <provider.TestProvider>{children}</provider.TestProvider>
          ),
        }
      );
    });

    test.each(FORM_CALLBACK_NAMES)("returns the %s function", (fnName) => {
      expect(hook.result.current).toEqual(
        expect.objectContaining({
          [fnName]: expect.any(Function),
        })
      );
    });
  });
});
