import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldErrorArg, UseFieldErrorReturn } from "../../lib";
import { TestForm, createTestProvider, TestProviderHandler } from "../TestForm";

describe("useFieldError", () => {
  test("is a function", () => {
    expect(TestForm.useFieldError).toEqual(expect.any(Function));
  });

  describe.each(["stringField", "childForm.stringField"] as const)("when rendered with field %j", (fieldName) => {
    let hook: RenderHookResult<
      UseFieldErrorReturn,
      UseFieldErrorArg<typeof fieldName>
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      hook = renderHook<
        UseFieldErrorReturn,
        UseFieldErrorArg<typeof fieldName>
      >(TestForm.useFieldError, {
        initialProps: {
          name: fieldName,
        },
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test.each([["error", undefined]] as const)(
      "returns %s as %j",
      (prop, value) => {
        expect(hook.result.current).toEqual(
          expect.objectContaining({
            [prop]: value,
          })
        );
      }
    );

    describe("when changeError called", () => {
      beforeEach(() => {
        hook.result.current.changeError("wrong");
      });

      test("calls setFieldError with field name and new value", () => {
        expect(provider.mocks.setFieldError).toHaveBeenCalledWith(
          fieldName,
          "wrong"
        );
      });
    });

    describe("when field has error in object", () => {
      beforeEach(() => {
        provider.mergeValue({
          errors: {
            [fieldName]: "wrong",
          }
        });
      });

      test.each([["error", "wrong"]] as const)(
        "returns %s as %j",
        (prop, value) => {
          expect(hook.result.current).toEqual(
            expect.objectContaining({
              [prop]: value,
            })
          );
        }
      );
    });
  });
});
