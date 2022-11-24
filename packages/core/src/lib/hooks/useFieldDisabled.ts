import { useMemo } from "react";
import { UseMainContextArg, UseMainContextReturn } from "./useMainContext";

export interface UseFieldDisabledReturn {
  disabled: boolean;
}

/**
 * @private
 */
export interface CreateUseFieldDisabledDependencies<
  Values,
  ExtraContext extends Record<string, unknown>
> {
  useMainContext: (
    arg: UseMainContextArg<Values, ExtraContext>
  ) => UseMainContextReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createUseFieldDisabled = <
  Values,
  ExtraContext extends Record<string, unknown>
>({
  useMainContext,
}: CreateUseFieldDisabledDependencies<Values, ExtraContext>) => {
  /**
   * Handle the disabled logic. Handles disabled while submitting.
   *
   * @returns {UseFieldDisabledReturn}
   */
  const useFieldDisabled = (): UseFieldDisabledReturn => {
    const { isSubmitting, disabledWhileSubmitting } = useMainContext({
      shouldUpdate: (oldValue, newValue) =>
        (["isSubmitting", "disabledWhileSubmitting"] as const).some(
          (a) => oldValue[a] !== newValue[a]
        ),
    });

    const disabled = isSubmitting && disabledWhileSubmitting;

    return useMemo(
      () => ({
        disabled,
      }),
      [disabled]
    );
  };

  return useFieldDisabled;
};
