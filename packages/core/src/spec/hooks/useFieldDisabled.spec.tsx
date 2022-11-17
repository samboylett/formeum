import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldDisabledReturn } from "../../lib";
import {
  TestForm,
  createTestProvider,
  TestProviderHandler,
} from "../TestForm";

describe("useFieldDisabled", () => {
  test("is a function", () => {
    expect(TestForm.useFieldDisabled).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFieldDisabledReturn,
      void
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<
        UseFieldDisabledReturn,
        void
      >(TestForm.useFieldDisabled, {
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test("returns disabled as false", () => {
      expect(hook.result.current.disabled).toEqual(false);
    });

    test.each([
      /* isSubmitting, disabledWhileSubmitting, disabled */
      [false, false, false],
      [true, false, false],
      [false, true, false],
      [true, true, true],
    ])("when isSubmitting is %j and disabledWhileSubmitting is %j disabled is %j", (isSubmitting, disabledWhileSubmitting, disabled) => {
      provider.mergeValue({
        isSubmitting,
        disabledWhileSubmitting,
      });

      expect(hook.result.current.disabled).toEqual(disabled);
    });
  });
});
