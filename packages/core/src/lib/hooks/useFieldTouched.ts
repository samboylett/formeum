import { useMemo } from "react";
import { UseMainContextArg, UseMainContextReturn } from "./useMainContext";
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from "use-event-callback";
import { BaseValues } from "../types/BaseValues";

export interface UseFieldTouchedArg<Name> {
  name: Name;
}

export interface UseFieldTouchedReturn {
  isTouched: boolean;

  /**
   * Set whether the field is marked as touched or not.
   *
   * @param {boolean} nextIsTouched
   */
  setIsTouched: (nextIsTouched: boolean) => void;
}

/**
 * @private
 */
export interface CreateUseFieldTouchedDependencies<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
  useMainContext: (
    arg: UseMainContextArg<Values, ExtraContext>
  ) => UseMainContextReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createUseFieldTouched = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
>({
  useMainContext,
}: CreateUseFieldTouchedDependencies<Values, ExtraContext>) => {
  /**
   * Check and change if the field has been touched or not.
   *
   * @param {UseFieldTouchedArg<Name>} arg
   * @returns {UseFieldTouchedReturn}
   */
  const useFieldTouched = <Name extends ValuesFields<Values>>({
    name,
  }: UseFieldTouchedArg<Name>): UseFieldTouchedReturn => {
    const { touched, setFieldTouched } = useMainContext({
      shouldUpdate: (oldValue, newValue) => {
        return oldValue.touched.has(name) !== newValue.touched.has(name);
      },
    });

    const isTouched = useMemo(() => touched.has(name), [touched, name]);

    const setIsTouched = useEventCallback((nextIsTouched: boolean) => {
      if (nextIsTouched === isTouched) return;

      setFieldTouched(name, nextIsTouched);
    });

    return useMemo(
      () => ({
        isTouched,
        setIsTouched,
      }),
      [isTouched, setIsTouched]
    );
  };

  return useFieldTouched;
};
