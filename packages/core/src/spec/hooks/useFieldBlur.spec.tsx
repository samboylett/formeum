import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldBlurArg, UseFieldBlurReturn } from "../../lib";
import {
  TestForm,
  createTestProvider,
  TestProviderHandler,
} from "../TestForm";

describe("useFieldBlur", () => {
  test("is a function", () => {
    expect(TestForm.useFieldBlur).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFieldBlurReturn,
      UseFieldBlurArg<"stringField">
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<UseFieldBlurReturn, UseFieldBlurArg<"stringField">>(
        TestForm.useFieldBlur,
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

    describe("when onBlur called", () => {
      beforeEach(() => {
        hook.result.current.onBlur();
      });

      test("does not call setFieldTouched", () => {
        expect(provider.mocks.setFieldTouched).not.toHaveBeenCalled();
      });

      test("does not call runValidation", () => {
        expect(provider.mocks.runValidation).not.toHaveBeenCalled();
      });
    });

    describe("when touchOnBlur is true", () => {
      beforeEach(() => {
        provider.mergeValue({
          touchOnBlur: true,
        });
      });

      describe("when onBlur called", () => {
        beforeEach(() => {
          hook.result.current.onBlur();
        });

        test("calls setFieldTouched with field name and true", () => {
          expect(provider.mocks.setFieldTouched).toHaveBeenCalledWith(
            "stringField",
            true
          );
        });
      });
    });

    describe("when validateOnBlur is true", () => {
      beforeEach(() => {
        provider.mergeValue({
          validateOnBlur: true,
        });
      });

      describe("when onBlur called", () => {
        beforeEach(() => {
          hook.result.current.onBlur();
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
