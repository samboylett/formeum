import { MutableRefObject, useLayoutEffect, useMemo, useRef } from "react";
import { ValuesFields } from "../types/ValuesFields";
import { UseFieldErrorArg, UseFieldErrorReturn } from "./useFieldError";
import { UseFieldTouchedArg } from "./useFieldTouched";
import { BaseValues } from "../types/BaseValues";

export interface UseFieldRefArg<Name> {
  name: Name;
}

export interface UseFieldRefReturn {
  ref: MutableRefObject<any | null>;
}

/**
 * @private
 */
export interface CreateUseFieldRefDependencies<Values extends BaseValues> {
  useFieldError: <Name extends ValuesFields<Values>>(
    arg: UseFieldErrorArg<Name>
  ) => UseFieldErrorReturn;
}

/**
 * @private
 */
const hasSetCustomValidity = <T>(
  obj: T
): obj is T & { setCustomValidity: unknown } => {
  return Boolean(obj && typeof obj === "object" && "setCustomValidity" in obj);
};

/**
 * @private
 */
export const createUseFieldRef = <Values extends BaseValues>({
  useFieldError,
}: CreateUseFieldRefDependencies<Values>) => {
  /**
   * Handle field logic which requires the native element.
   *
   * @param {UseFieldRefArg<Name>} arg
   * @returns {UseFieldRefReturn}
   */
  const useFieldRef = <Name extends ValuesFields<Values>>({
    name,
  }: UseFieldTouchedArg<Name>): UseFieldRefReturn => {
    const ref = useRef<any>(null);
    const { error } = useFieldError<Name>({ name });

    useLayoutEffect(() => {
      const el: unknown = ref.current;

      if (
        hasSetCustomValidity(el) &&
        typeof el.setCustomValidity === "function"
      ) {
        el.setCustomValidity(error || "");
      }
    });

    return useMemo(
      () => ({
        ref,
      }),
      [ref]
    );
  };

  return useFieldRef;
};
