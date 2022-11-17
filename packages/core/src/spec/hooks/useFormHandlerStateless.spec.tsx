import { renderHook, RenderHookResult } from "@testing-library/react";
import {
  UseFormHandlerStatelessArg,
  UseFormHandlerStatelessReturn,
} from "../../lib";
import {
  TestForm,
  TestFormValues,
  createTestProvider,
  TestProviderHandler,
  getInitialValues,
  getFilledValues,
} from "../TestForm";

describe("useFormHandlerStateless", () => {
  test("is a function", () => {
    expect(TestForm.useFormHandlerStateless).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFormHandlerStatelessReturn<TestFormValues>,
      UseFormHandlerStatelessArg<TestFormValues>
    >;
    let provider: TestProviderHandler;
    let initialProps: UseFormHandlerStatelessArg<TestFormValues>;

    beforeEach(() => {
      provider = createTestProvider();
      initialProps = {
        onValues: jest.fn(),
        onErrors: jest.fn(),
        onIsSubmitting: jest.fn(),
        onSubmit: jest.fn(),
        onTouched: jest.fn(),
        validate: jest.fn().mockResolvedValue({}),
        initialValues: getInitialValues(),
        values: getInitialValues(),
        errors: {},
        touched: new Set([]),
        isSubmitting: false,
      };

      hook = renderHook<
        UseFormHandlerStatelessReturn<TestFormValues>,
        UseFormHandlerStatelessArg<TestFormValues>
      >(TestForm.useFormHandlerStateless, {
        initialProps,
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test.each([
      ["values", getInitialValues()],
      ["initialValues", getInitialValues()],
      ["errors", {}],
      ["touched", new Set([])],
      ["touchOnChange", true],
      ["touchOnBlur", true],
      ["touchOnFocus", false],
      ["validateOnBlur", true],
      ["validateOnChange", false],
      ["validateOnFocus", false],
      ["validateOnMount", false],
      ["validateOnSubmit", true],
      ["isSubmitting", false],
      ["disabledWhileSubmitting", false],
    ] as const)("returns %s as %j", (prop, value) => {
      expect(hook.result.current).toEqual(
        expect.objectContaining({
          [prop]: value,
        })
      );
    });

    describe.each([
      ["initialValues", getFilledValues()],
      ["values", getFilledValues()],
      ["touched", new Set(["stringField"])],
      ["errors", { stringField: "foo" }],
      ["isSubmitting", true],
    ] as const)("when %s changed", (attribute, newValue) => {
      beforeEach(() => {
        hook.rerender({
          ...initialProps,
          [attribute]: newValue,
        });
      });

      test(`returns ${attribute} as new value`, () => {
        expect(hook.result.current).toEqual(
          expect.objectContaining({
            [attribute]: newValue,
          })
        );
      });
    });

    describe.each([
      "touchOnChange",
      "touchOnBlur",
      "touchOnFocus",
      "validateOnBlur",
      "validateOnChange",
      "validateOnFocus",
      "validateOnMount",
      "validateOnSubmit",
      "disabledWhileSubmitting",
    ] as const)("when %s config set", (configName) => {
      describe.each([true, false] as const)("to %j", (configValue) => {
        beforeEach(() => {
          hook.rerender({
            ...initialProps,
            [configName]: configValue,
          });
        });

        test.each([[configName, configValue]] as const)(
          "returns %s as %j",
          () => {
            expect(hook.result.current).toEqual(
              expect.objectContaining({
                [configName]: configValue,
              })
            );
          }
        );
      });
    });

    describe("when setErrors called with same value", () => {
      beforeEach(() => {
        hook.result.current.setErrors({});
      });

      test("does not call onErrors", () => {
        expect(initialProps.onErrors).not.toHaveBeenCalled();
      });
    });

    describe("when setFieldError called with new value", () => {
      beforeEach(() => {
        hook.result.current.setFieldError("childForm.stringField", "Required!");
      });

      test("calls onErrors with new errors", () => {
        expect(initialProps.onErrors).toHaveBeenCalledWith({
          "childForm.stringField": "Required!",
        });
      });
    });

    describe("when setFieldTouched called to add field", () => {
      beforeEach(() => {
        hook.result.current.setFieldTouched("childForm.numberField", true);
      });

      test("calls onTouched with new touched set", () => {
        expect(initialProps.onTouched).toHaveBeenCalledWith(new Set([
          "childForm.numberField",
        ]));
      });
    });

    describe("when setValues called with same value", () => {
      beforeEach(() => {
        hook.result.current.setValues({ ...initialProps.values });
      });

      test("does not call onValues", () => {
        expect(initialProps.onValues).not.toHaveBeenCalled();
      });
    });

    describe("when setFieldValue called with same field value", () => {
      beforeEach(() => {
        hook.result.current.setFieldValue("stringField", initialProps.values.stringField);
      });

      test("does not call onValues", () => {
        expect(initialProps.onValues).not.toHaveBeenCalled();
      });
    });

    describe("when setValues called with new value", () => {
      beforeEach(() => {
        hook.result.current.setValues({
          ...initialProps.values,
          stringField: "new",
        });
      });

      test("calls onValues with new values", () => {
        expect(initialProps.onValues).toHaveBeenCalledWith({
          ...initialProps.values,
          stringField: "new",
        });
      });

      test("does not call validate", () => {
        expect(initialProps.validate).not.toHaveBeenCalled();
      });
    });

    describe("when setValues called with new value and validate true", () => {
      beforeEach(() => {
        hook.result.current.setValues(
          {
            ...initialProps.values,
            stringField: "new",
          },
          true
        );
      });

      test("calls onValues with new values", () => {
        expect(initialProps.onValues).toHaveBeenCalledWith({
          ...initialProps.values,
          stringField: "new",
        });
      });

      test("calls validate with new values", () => {
        expect(initialProps.validate).toHaveBeenCalledWith(
          {
            ...initialProps.values,
            stringField: "new",
          },
          undefined
        );
      });
    });

    describe("when setFieldValue called with new value", () => {
      beforeEach(() => {
        hook.result.current.setFieldValue("stringField", "foo");
      });

      test("calls onValues with new values", () => {
        expect(initialProps.onValues).toHaveBeenCalledWith({
          ...initialProps.values,
          stringField: "foo",
        });
      });

      test("does not call validate", () => {
        expect(initialProps.validate).not.toHaveBeenCalled();
      });
    });

    describe("when setFieldValue called with new value and validate true", () => {
      beforeEach(() => {
        hook.result.current.setFieldValue("stringField", "foo", true);
      });

      test("calls onValues with new values", () => {
        expect(initialProps.onValues).toHaveBeenCalledWith({
          ...initialProps.values,
          stringField: "foo",
        });
      });

      test("calls validate with new values and field name", () => {
        expect(initialProps.validate).toHaveBeenCalledWith(
          {
            ...initialProps.values,
            stringField: "foo",
          },
          "stringField"
        );
      });
    });

    describe("when setFieldValue called with deep field new value and validate true", () => {
      beforeEach(() => {
        hook.result.current.setFieldValue("childForm.stringField", "bar", true);
      });

      test("calls onValues with new values", () => {
        expect(initialProps.onValues).toHaveBeenCalledWith({
          ...initialProps.values,
          childForm: {
            ...initialProps.values.childForm,
            stringField: "bar",
          },
        });
      });

      test("calls validate with new values and field name", () => {
        expect(initialProps.validate).toHaveBeenCalledWith(
          {
            ...initialProps.values,
            childForm: {
              ...initialProps.values.childForm,
              stringField: "bar",
            },
          },
          "childForm.stringField"
        );
      });
    });

    describe("when setFieldValue called with new value and validate true", () => {
      beforeEach(() => {
        hook.result.current.setFieldValue("stringField", "foo", true);
      });

      test("calls onValues with new values", () => {
        expect(initialProps.onValues).toHaveBeenCalledWith({
          ...initialProps.values,
          stringField: "foo",
        });
      });

      test("calls validate with new values and field name", () => {
        expect(initialProps.validate).toHaveBeenCalledWith(
          {
            ...initialProps.values,
            stringField: "foo",
          },
          "stringField"
        );
      });
    });

    describe("when validateOnChange true", () => {
      beforeEach(() => {
        hook.rerender({
          ...initialProps,
          validateOnChange: true,
        });
      });

      describe("when setFieldValue called with new value", () => {
        beforeEach(() => {
          hook.result.current.setFieldValue("stringField", "foo");
        });

        test("calls onValues with new values", () => {
          expect(initialProps.onValues).toHaveBeenCalledWith({
            ...initialProps.values,
            stringField: "foo",
          });
        });

        test("calls validate once", () => {
          expect(initialProps.validate).toHaveBeenCalledTimes(1);
        });

        test("calls validate with new values and field name", () => {
          expect(initialProps.validate).toHaveBeenCalledWith(
            {
              ...initialProps.values,
              stringField: "foo",
            },
            "stringField"
          );
        });
      });

      describe("when setValues called with new value", () => {
        beforeEach(() => {
          hook.result.current.setValues({
            ...initialProps.values,
            stringField: "new",
          });
        });

        test("calls onValues with new values", () => {
          expect(initialProps.onValues).toHaveBeenCalledWith({
            ...initialProps.values,
            stringField: "new",
          });
        });

        test("calls validate with new values", () => {
          expect(initialProps.validate).toHaveBeenCalledWith(
            {
              ...initialProps.values,
              stringField: "new",
            },
            undefined
          );
        });
      });

      describe("when setValues called with new value and validate false", () => {
        beforeEach(() => {
          hook.result.current.setValues(
            {
              ...initialProps.values,
              stringField: "new",
            },
            false
          );
        });

        test("calls onValues with new values", () => {
          expect(initialProps.onValues).toHaveBeenCalledWith({
            ...initialProps.values,
            stringField: "new",
          });
        });

        test("does not call validate", () => {
          expect(initialProps.validate).not.toHaveBeenCalled();
        });
      });
    });
  });
});
