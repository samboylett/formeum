import { act, renderHook, RenderHookResult } from "@testing-library/react";
import { UseFormHandlerArg, UseFormHandlerReturn } from "../../lib";
import {
  TestForm,
  TestFormValues,
  createTestProvider,
  TestProviderHandler,
  getInitialValues,
} from "../TestForm";

describe("useFormHandler", () => {
  test("is a function", () => {
    expect(TestForm.useFormHandler).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFormHandlerReturn<TestFormValues>,
      UseFormHandlerArg<TestFormValues>
    >;
    let provider: TestProviderHandler;
    let initialProps: UseFormHandlerArg<TestFormValues>;
    let resolveOnSubmit: () => void;

    beforeEach(() => {
      provider = createTestProvider();
      initialProps = {
        onSubmit: jest.fn().mockReturnValue(
          new Promise<void>((r) => {
            resolveOnSubmit = r;
          })
        ),
        validate: jest.fn().mockResolvedValue({}),
        initialValues: getInitialValues(),
      };

      hook = renderHook<
        UseFormHandlerReturn<TestFormValues>,
        UseFormHandlerArg<TestFormValues>
      >(TestForm.useFormHandler, {
        initialProps,
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test.each([
      ["values", getInitialValues()],
      ["errors", {}],
      ["touched", new Set([])],
      ["isSubmitting", false],
    ] as const)("returns %s as %j", (prop, value) => {
      expect(hook.result.current).toEqual(
        expect.objectContaining({
          [prop]: value,
        })
      );
    });

    describe("when setValues called", () => {
      beforeEach(() => {
        act(() => {
          hook.result.current.setValues({
            ...getInitialValues(),
            stringField: "foo",
          });
        });
      });

      test("returns new values", () => {
        expect(hook.result.current.values).toEqual({
          ...getInitialValues(),
          stringField: "foo",
        });
      });
    });

    describe("when setErrors called", () => {
      beforeEach(() => {
        act(() => {
          hook.result.current.setErrors({
            stringField: "Bad",
          });
        });
      });

      test("returns new errors", () => {
        expect(hook.result.current.errors).toEqual({
          stringField: "Bad",
        });
      });
    });

    describe("when setFieldTouched called", () => {
      beforeEach(() => {
        act(() => {
          hook.result.current.setFieldTouched("stringField", true);
        });
      });

      test("returns new touched fields", () => {
        expect(hook.result.current.touched).toEqual(new Set(["stringField"]));
      });
    });

    describe("when submitForm called", () => {
      beforeEach(() => {
        act(() => {
          hook.result.current.submitForm();
        });
      });

      test("returns isSubmitting as true", () => {
        expect(hook.result.current.isSubmitting).toEqual(true);
      });

      describe("when onSubmit resolves", () => {
        beforeEach(async () => {
          await act(async () => {
            await resolveOnSubmit();
          });
        });

        test("returns isSubmitting as false", () => {
          expect(hook.result.current.isSubmitting).toEqual(false);
        });
      });
    });
  });
});
