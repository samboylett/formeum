import { useMemo } from "react";
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from "use-event-callback";
import { UseFieldTouchedArg, UseFieldTouchedReturn } from "./useFieldTouched";
import { UseCurrentContextReturn } from "./useCurrentContext";

export interface UseFieldFocusArg<Name> {
  name: Name;
}

export interface UseFieldFocusReturn {
  onFocus: () => void;
}

/**
 * @private
 */
export interface CreateUseFieldFocusDependencies<
  Values,
  ExtraContext extends Record<string, unknown>
> {
  useFieldTouched: <Name extends ValuesFields<Values>>(
    arg: UseFieldTouchedArg<Name>
  ) => UseFieldTouchedReturn;
  useCurrentContext: () => UseCurrentContextReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createUseFieldFocus = <
  Values,
  ExtraContext extends Record<string, unknown>
>({
  useFieldTouched,
  useCurrentContext,
}: CreateUseFieldFocusDependencies<Values, ExtraContext>) => {
  /**
   * Handle the focus logic. Handles touch on focus and validate on focus logic.
   *
   * @param {UseFieldTouchedArg<Name>} arg
   * @returns {UseFieldFocusReturn}
   */
  const useFieldFocus = <Name extends ValuesFields<Values>>({
    name,
  }: UseFieldTouchedArg<Name>): UseFieldFocusReturn => {
    const { setIsTouched } = useFieldTouched<Name>({ name });
    const contextRef = useCurrentContext();

    const onFocus = useEventCallback(() => {
      if (contextRef.current.touchOnFocus) {
        setIsTouched(true);
      }

      if (contextRef.current.validateOnFocus) {
        contextRef.current.runValidation({
          fieldName: name,
        });
      }
    });

    return useMemo(
      () => ({
        onFocus,
      }),
      [onFocus]
    );
  };

  return useFieldFocus;
};
