import { createForm } from '../createForm';
import { renderHook, RenderHookResult } from "@testing-library/react";
import { UseFieldArg, UseFieldReturn } from './useField';
import EventEmitter from 'events';
import { EVENT_ERRORS_CHANGE, EVENT_VALUES_CHANGE } from '../constants/events';
import { act } from 'react-dom/test-utils';

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
    let events: EventEmitter;
    let setFieldError: jest.Mock;
    let setFieldValue: jest.Mock;

    beforeEach(() => {
      events = new EventEmitter();
      setFieldError = jest.fn();
      setFieldValue = jest.fn();

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
            setFieldError,
            setFieldValue,
            handleChangeEvent: jest.fn(),
            events,
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

    describe("when changeValue called", () => {
      beforeEach(() => {
        hook.result.current.changeValue("test");
      });

      test("calls setFieldValue with field name and new value", () => {
        expect(setFieldValue).toHaveBeenCalledWith("foo", "test");
      });
    });

    describe("when changeError called", () => {
      beforeEach(() => {
        hook.result.current.changeError("wrong");
      });

      test("calls setFieldError with field name and new error", () => {
        expect(setFieldError).toHaveBeenCalledWith("foo", "wrong");
      });
    });

    describe("when value updates", () => {
      beforeEach(() => {
        act(() => {
          events.emit(EVENT_VALUES_CHANGE, {
            foo: "2",
            bar: "3",
          });
        });
      });

      test.each([
        ["value", "2"],
        ["error", undefined],
      ] as const)("returns %s as %j", (prop, value) => {
        expect(hook.result.current).toEqual(expect.objectContaining({
          [prop]: value,
        }));
      });
    });

    describe("when different value updates", () => {
      beforeEach(() => {
        act(() => {
          events.emit(EVENT_VALUES_CHANGE, {
            foo: "1",
            bar: "3",
          });
        });
      });

      test.each([
        ["value", "1"],
        ["error", undefined],
      ] as const)("returns %s as %j", (prop, value) => {
        expect(hook.result.current).toEqual(expect.objectContaining({
          [prop]: value,
        }));
      });
    });

    describe("when error updates", () => {
      beforeEach(() => {
        act(() => {
          events.emit(EVENT_ERRORS_CHANGE, {
            foo: "An error",
          });
        });
      });

      test.each([
        ["value", "1"],
        ["error", "An error"],
      ] as const)("returns %s as %j", (prop, value) => {
        expect(hook.result.current).toEqual(expect.objectContaining({
          [prop]: value,
        }));
      });
    });

    describe("when different error updates", () => {
      beforeEach(() => {
        act(() => {
          events.emit(EVENT_ERRORS_CHANGE, {
            bar: "An error",
          });
        });
      });

      test.each([
        ["value", "1"],
        ["error", undefined],
      ] as const)("returns %s as %j", (prop, value) => {
        expect(hook.result.current).toEqual(expect.objectContaining({
          [prop]: value,
        }));
      });
    });
  });
});
