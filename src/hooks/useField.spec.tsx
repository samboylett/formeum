import { createForm } from '../createForm';
import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldArg, UseFieldReturn } from './useField';
import EventEmitter from 'events';

interface Values {
  foo: string;
  bar: string;
}

const { useField, ContextMain } = createForm<Values>({});

describe("useField", () => {
  test("is a function", () => {
    expect(useField).toEqual(expect.any(Function));
  });

  describe("when rendered", () => {
    let hook: RenderHookResult<UseFieldReturn<Values, "foo">, UseFieldArg<"foo">>;

    beforeEach(() => {
      hook = renderHook<UseFieldReturn<Values, "foo">, UseFieldArg<"foo">>(useField, {
        initialProps: {
          name: "foo",
        },
        wrapper: ({ children }) => (
          <ContextMain.Provider value={{
            values: {
              foo: "1",
              bar: "2",
            },
            errors: {},
            setValues: jest.fn(),
            setErrors: jest.fn(),
            setFieldError: jest.fn(),
            setFieldValue: jest.fn(),
            handleChangeEvent: jest.fn(),
            events: new EventEmitter(),
          }}>
            {children}
          </ContextMain.Provider>
        ),
      });
    });

    test.each([
      ["value", "1"],
      ["error", undefined],
      ["name", "foo"]
    ] as const)("returns %s as %j", (prop, value) => {
      expect(hook.result.current).toEqual(expect.objectContaining({
        [prop]: value,
      }));
    });
  });
});
