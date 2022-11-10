import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldValueArg, UseFieldValueReturn } from "../../lib";
import { TestForm, TestFormValues, createTestProvider, TestProviderHandler } from "../TestForm";

describe("useFieldValue", () => {
  test("is a function", () => {
    expect(TestForm.useFieldValue).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFieldValueReturn<TestFormValues, "stringField">,
      UseFieldValueArg<"stringField">
    >;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();

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
            <provider.TestProvider>
              {children}
            </provider.TestProvider>
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
        expect(provider.mocks.setFieldValue).toHaveBeenCalledWith("stringField", "test");
      });
    });

    describe("when value changed", () => {
      beforeEach(() => {
        provider.mergeValue({
          values: {
            stringField: "new-val",
            numberField: 0,
            booleanField: false,

            childForm: {
              stringField: "",
              numberField: 0,
              booleanField: false,
            },
          },
        })
      });
      
      test.each([
        ["value", "new-val"],
        ["initialValue", ""],
        ["hasChanged", true],
      ] as const)("returns %s as %j", (prop, value) => {
        expect(hook.result.current).toEqual(
          expect.objectContaining({
            [prop]: value,
          })
        );
      });
    });
  });
});
