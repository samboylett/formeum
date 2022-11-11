import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldRefArg, UseFieldRefReturn } from "../../lib";
import { TestForm, createTestProvider, TestProviderHandler } from "../TestForm";

describe("useFieldRef", () => {
  test("is a function", () => {
    expect(TestForm.useFieldRef).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<
      UseFieldRefReturn,
      UseFieldRefArg<"stringField">
    >;
    let provider: TestProviderHandler;
    let input: Pick<HTMLObjectElement, 'setCustomValidity'>;

    beforeEach(() => {
      provider = createTestProvider();
      input = {
        setCustomValidity: jest.fn(),
      };

      hook = renderHook<
        UseFieldRefReturn,
        UseFieldRefArg<"stringField">
      >(props => {
        const retVal = TestForm.useFieldRef(props);

        retVal.ref.current = input;

        return retVal;
      }, {
        initialProps: {
          name: "stringField",
        },
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test("returns ref", () => {
      expect(hook.result.current.ref).toEqual(expect.objectContaining({
        current: expect.anything(),
      }));
    });

    test("calls setCustomValidity with empty string", () => {
      expect(input.setCustomValidity).toHaveBeenCalledWith("");
    });

    describe("when field has error in object", () => {
      beforeEach(() => {
        provider.mergeValue({
          errors: {
            stringField: "wrong",
          },
        });
      });

      test("calls setCustomValidity with error", () => {
        expect(input.setCustomValidity).toHaveBeenCalledWith("wrong");
      });
    });
  });
});
