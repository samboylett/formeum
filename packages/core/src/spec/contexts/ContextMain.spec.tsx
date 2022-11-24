import { renderHook, RenderHookResult } from "@testing-library/react";
import { useFastContext } from "react-fast-context";
import { ContextMainInterface } from "../../lib";
import { NoContextError } from "../../lib/errors/NoContextError";
import { TestForm, TestFormValues } from "../TestForm";

describe("ContextMain defaults", () => {
  let hook: RenderHookResult<
    ContextMainInterface<TestFormValues, Record<never, never>>,
    void
  >;

  beforeEach(() => {
    hook = renderHook(() => useFastContext(TestForm.ContextMain, () => true));
  });

  test.each(["values", "initialValues"] as const)(
    "reading %s throws NoContextError",
    (attr) => {
      expect(() => {
        hook.result.current[attr];
      }).toThrow(NoContextError);
    }
  );
});
