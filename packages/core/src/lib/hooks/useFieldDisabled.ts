import { useMemo } from "react";
import { UseMainContextArg, UseMainContextReturn } from "./useMainContext";

export interface UseFieldDisabledReturn {
  disabled: boolean;
}

/**
 * @private
 */
export interface CreateUseFieldDisabledDependencies<Values> {
  useMainContext: (
    arg: UseMainContextArg<Values>
  ) => UseMainContextReturn<Values>;
}

/**
 * @private
 */
export const createUseFieldDisabled = <Values>({
  useMainContext,
}: CreateUseFieldDisabledDependencies<Values>) => {
  /**
   * Handle the disabled logic. Handles disabled while submitting.
   *
   * @param {UseFieldDisabledArg<Name>} arg
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
