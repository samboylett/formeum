import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseChangeHandlerArg, UseChangeHandlerReturn } from "../../lib";
import {
  TestForm,
  createTestProvider,
  TestProviderHandler,
  TestFormValues,
} from "../TestForm";

describe("useChangeHandler", () => {
  test("is a function", () => {
    expect(TestForm.useChangeHandler).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let stringHook: RenderHookResult<
      UseChangeHandlerReturn<TestFormValues, "stringField">,
      UseChangeHandlerArg<"stringField">
    >;
    let booleanHook: RenderHookResult<
      UseChangeHandlerReturn<TestFormValues, "booleanField">,
      UseChangeHandlerArg<"booleanField">
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

      stringHook = renderHook<
        UseChangeHandlerReturn<TestFormValues, "stringField">,
        UseChangeHandlerArg<"stringField">
      >(TestForm.useChangeHandler, {
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
        stringHook.result.current.changeValue("test");
      });

      test("calls setFieldValue with field name and new value", () => {
        expect(provider.mocks.setFieldValue).toHaveBeenCalledWith(
          "stringField",
          "test"
        );
      });
    });

    describe.each(["target", "currentTarget"] as const)(
      "when event has %s filled",
      (targetName) => {
        describe("when handleChangeEvent called", () => {
          beforeEach(() => {
            stringHook.result.current.handleChangeEvent({
              [targetName]: {
                value: "foo",
              },
            } as any);
          });

          test("calls setFieldValue with field name and new value", () => {
            expect(provider.mocks.setFieldValue).toHaveBeenCalledWith(
              "stringField",
              "foo"
            );
          });
        });

        describe.each([true, false])(
          "when handleCheckboxEvent called with checked as %j",
          (checked) => {
            beforeEach(() => {
              booleanHook = renderHook<
                UseChangeHandlerReturn<TestFormValues, "booleanField">,
                UseChangeHandlerArg<"booleanField">
              >(TestForm.useChangeHandler, {
                initialProps: {
                  name: "booleanField",
                },
                wrapper: ({ children }) => (
                  <provider.TestProvider>{children}</provider.TestProvider>
                ),
              });
              booleanHook.result.current.handleCheckboxEvent({
                [targetName]: {
                  checked,
                },
              } as any);
            });

            test("calls setFieldValue with field name and new value", () => {
              expect(provider.mocks.setFieldValue).toHaveBeenCalledWith(
                "booleanField",
                checked
              );
            });
          }
        );
      }
    );
  });
});
