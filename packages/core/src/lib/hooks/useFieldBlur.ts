import { useMemo } from "react";
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from "use-event-callback";
import { UseFieldTouchedArg, UseFieldTouchedReturn } from "./useFieldTouched";
import { UseCurrentContextReturn } from "./useCurrentContext";
import { BaseValues } from "../types/BaseValues";

export interface UseFieldBlurArg<Name> {
  name: Name;
}

export interface UseFieldBlurReturn {
  onBlur: () => void;
}

/**
 * @private
 */
export interface CreateUseFieldBlurDependencies<
  Values extends BaseValues,
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
export const createUseFieldBlur = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
>({
  useFieldTouched,
  useCurrentContext,
}: CreateUseFieldBlurDependencies<Values, ExtraContext>) => {
  /**
   * Handle the blur logic. Handles touch on blur and validate on blur.
   *
   * @param {UseFieldTouchedArg<Name>} arg
   * @returns {UseFieldBlurReturn}
   */
  const useFieldBlur = <Name extends ValuesFields<Values>>({
    name,
  }: UseFieldTouchedArg<Name>): UseFieldBlurReturn => {
    const { setIsTouched } = useFieldTouched<Name>({ name });
    const contextRef = useCurrentContext();

    const onBlur = useEventCallback(() => {
      if (contextRef.current.touchOnBlur) {
        setIsTouched(true);
      }

      if (contextRef.current.validateOnBlur) {
        contextRef.current.runValidation({
          fieldName: name,
        });
      }
    });

    return useMemo(
      () => ({
        onBlur,
      }),
      [onBlur]
    );
  };

  return useFieldBlur;
};
