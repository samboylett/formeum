import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldValueArg, UseFieldValueReturn } from "../../lib";
import { TestForm, TestFormValues, TestProvider } from "../TestForm";

describe("useFieldValue", () => {
  test("is a function", () => {
    expect(TestForm.useFieldValue).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFieldValueReturn<TestFormValues, "stringField">,
      UseFieldValueArg<"stringField">
    >;
    let setFieldValue: jest.Mock;

    beforeEach(() => {
      setFieldValue = jest.fn();

      hook = renderHook<
        UseFieldValueReturn<TestFormValues, "stringField">,
        UseFieldValueArg<"stringField">
      >(
        TestForm.useFieldValue,
        {
          initialProps: {
            name: "stringField",
          },
          wrapper: ({ children }) => (
            <TestProvider overrides={{ setFieldValue }}>
              {children}
            </TestProvider>
          ),
        }
      );
    });

    test.each([
      ["value", ""],
      ["initialValue", ""],
      ["hasChanged", false],
    ] as const)("returns %s as %j", (prop, value) => {
      expect(hook.result.current).toEqual(
        expect.objectContaining({
          [prop]: value,
        })
      );
    });

    describe("when changeValue called", () => {
      beforeEach(() => {
        hook.result.current.changeValue("test");
      });

      test("calls setFieldValue with field name and new value", () => {
        expect(setFieldValue).toHaveBeenCalledWith("stringField", "test");
      });
    });
  });
});
