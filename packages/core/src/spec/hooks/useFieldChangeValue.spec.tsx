import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldChangeValueArg, UseFieldChangeValueReturn } from "../../lib";
import {
  TestForm,
  TestFormValues,
  createTestProvider,
  TestProviderHandler,
} from "../TestForm";

describe("useFieldChangeValue", () => {
  test("is a function", () => {
    expect(TestForm.useFieldChangeValue).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFieldChangeValueReturn<TestFormValues, "stringField">,
      UseFieldChangeValueArg<"stringField">
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<
        UseFieldChangeValueReturn<TestFormValues, "stringField">,
        UseFieldChangeValueArg<"stringField">
      >(TestForm.useFieldChangeValue, {
        initialProps: {
          name: "stringField",
        },
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    describe("when changeValue called", () => {
      beforeEach(() => {
        hook.result.current.changeValue("test");
      });

      test("calls setFieldChangeValue with field name and new value", () => {
        expect(provider.mocks.setFieldValue).toHaveBeenCalledWith(
          "stringField",
          "test"
        );
      });

      test("does not call setFieldTouched", () => {
        expect(provider.mocks.setFieldTouched).not.toHaveBeenCalled();
      });
    });

    describe("when touchOnChange is true", () => {
      beforeEach(() => {
        provider.mergeValue({
          touchOnChange: true,
        });
      });

      describe("when changeValue called", () => {
        beforeEach(() => {
          hook.result.current.changeValue("test");
        });

        test("calls setFieldChangeValue with field name and new value", () => {
          expect(provider.mocks.setFieldValue).toHaveBeenCalledWith(
            "stringField",
            "test"
          );
        });

        test("calls setFieldTouched with field name and true", () => {
          expect(provider.mocks.setFieldTouched).toHaveBeenCalledWith(
            "stringField",
            true
          );
        });
      });
    });
  });
});
