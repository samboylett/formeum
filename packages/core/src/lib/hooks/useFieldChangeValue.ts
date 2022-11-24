import { useMemo } from "react";
import { DeepIndex } from "../types/DeepIndex";
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from "use-event-callback";
import { UseFieldTouchedArg, UseFieldTouchedReturn } from "./useFieldTouched";
import { UseCurrentContextReturn } from "./useCurrentContext";

export interface UseFieldChangeValueArg<Name> {
  name: Name;
}

export interface UseFieldChangeValueReturn<
  Values,
  Name extends ValuesFields<Values>
> {
  /**
   * Change the fields value.
   *
   * @param {DeepIndex<Values, Name>} newValue
   */
  changeValue: (newValue: DeepIndex<Values, Name>) => void;
}

/**
 * @private
 */
export interface CreateUseFieldChangeValueDependencies<Values, ExtraContext extends Record<string, unknown>> {
  useCurrentContext: () => UseCurrentContextReturn<Values, ExtraContext>;
  useFieldTouched: <Name extends ValuesFields<Values>>(
    arg: UseFieldTouchedArg<Name>
  ) => UseFieldTouchedReturn;
}

/**
 * @private
 */
export const createUseFieldChangeValue = <Values, ExtraContext extends Record<string, unknown>>({
  useFieldTouched,
  useCurrentContext,
}: CreateUseFieldChangeValueDependencies<Values, ExtraContext>) => {
  /**
   * Logic around changing fields value.
   *
   * @param {UseFieldChangeValueArg<Name>} arg
   * @returns {UseFieldChangeValueReturn<Values, Name>}
   */
  const useFieldChangeValue = <Name extends ValuesFields<Values>>({
    name,
  }: UseFieldChangeValueArg<Name>): UseFieldChangeValueReturn<Values, Name> => {
    const contextRef = useCurrentContext();
    const { setIsTouched } = useFieldTouched<Name>({ name });

    const changeValue = useEventCallback(
      (newValue: DeepIndex<Values, Name>) => {
        contextRef.current.setFieldValue(name, newValue);

        if (contextRef.current.touchOnChange) setIsTouched(true);
      }
    );

    return useMemo(
      () => ({
        changeValue,
      }),
      [changeValue]
    );
  };

  return useFieldChangeValue;
};
