import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldTouchedArg, UseFieldTouchedReturn } from "../../lib";
import {
  TestForm,
  TestFormValues,
  createTestProvider,
  TestProviderHandler,
} from "../TestForm";

describe("useFieldTouched", () => {
  test("is a function", () => {
    expect(TestForm.useFieldTouched).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFieldTouchedReturn,
      UseFieldTouchedArg<"stringField">
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<
        UseFieldTouchedReturn,
        UseFieldTouchedArg<"stringField">
      >(TestForm.useFieldTouched, {
        initialProps: {
          name: "stringField",
        },
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test.each([
      ["isTouched", false],
    ] as const)("returns %s as %j", (prop, value) => {
      expect(hook.result.current).toEqual(
        expect.objectContaining({
          [prop]: value,
        })
      );
    });

    describe("when setIsTouched called", () => {
      beforeEach(() => {
        hook.result.current.setIsTouched(true);
      });

      test("calls setFieldTouched with field name and new value", () => {
        expect(provider.mocks.setFieldTouched).toHaveBeenCalledWith(
          "stringField",
          true
        );
      });
    });

    describe("when field is in touched set", () => {
      beforeEach(() => {
        provider.mergeValue({
          touched: new Set(["stringField"]),
        })
      });

      test.each([
        ["isTouched", true],
      ] as const)("returns %s as %j", (prop, value) => {
        expect(hook.result.current).toEqual(
          expect.objectContaining({
            [prop]: value,
          })
        );
      });

      describe("when setIsTouched called", () => {
        beforeEach(() => {
          hook.result.current.setIsTouched(true);
        });
  
        test("does not call setFieldTouched", () => {
          expect(provider.mocks.setFieldTouched).not.toHaveBeenCalled();
        });
      });
    });
  });
});
