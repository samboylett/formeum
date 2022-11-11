import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldFocusArg, UseFieldFocusReturn } from "../../lib";
import { TestForm, createTestProvider, TestProviderHandler } from "../TestForm";

describe("useFieldFocus", () => {
  test("is a function", () => {
    expect(TestForm.useFieldFocus).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFieldFocusReturn,
      UseFieldFocusArg<"stringField">
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<UseFieldFocusReturn, UseFieldFocusArg<"stringField">>(
        TestForm.useFieldFocus,
        {
          initialProps: {
            name: "stringField",
          },
          wrapper: ({ children }) => (
            <provider.TestProvider>{children}</provider.TestProvider>
          ),
        }
      );
    });

    describe("when onFocus called", () => {
      beforeEach(() => {
        hook.result.current.onFocus();
      });

      test("does not call setFieldTouched", () => {
        expect(provider.mocks.setFieldTouched).not.toHaveBeenCalled();
      });

      test("does not call runValidation", () => {
        expect(provider.mocks.runValidation).not.toHaveBeenCalled();
      });
    });

    describe("when touchOnFocus is true", () => {
      beforeEach(() => {
        provider.mergeValue({
          touchOnFocus: true,
        });
      });

      describe("when onFocus called", () => {
        beforeEach(() => {
          hook.result.current.onFocus();
        });

        test("calls setFieldTouched with field name and true", () => {
          expect(provider.mocks.setFieldTouched).toHaveBeenCalledWith(
            "stringField",
            true
          );
        });
      });
    });

    describe("when validateOnFocus is true", () => {
      beforeEach(() => {
        provider.mergeValue({
          validateOnFocus: true,
        });
      });

      describe("when onFocus called", () => {
        beforeEach(() => {
          hook.result.current.onFocus();
        });

        test("calls runValidation with field name", () => {
          expect(provider.mocks.runValidation).toHaveBeenCalledWith({
            fieldName: "stringField",
          });
        });
      });
    });
  });
});
