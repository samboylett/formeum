import { useMemo } from "react";
import { DeepIndex } from "../types/DeepIndex";
import { UseMainContextArg, UseMainContextReturn } from "./useMainContext";
import { get, isEqual } from "lodash";
import { ValuesFields } from "../types/ValuesFields";
import {
  UseFieldChangeValueArg,
  UseFieldChangeValueReturn,
} from "./useFieldChangeValue";

export interface UseFieldValueArg<Name> {
  name: Name;
}

export interface UseFieldValueReturn<
  Values extends Record<any, any>,
  Name extends ValuesFields<Values>
> extends UseFieldChangeValueReturn<Values, Name> {
  value: DeepIndex<Values, Name>;
  initialValue: DeepIndex<Values, Name>;
  hasChanged: boolean;
}

/**
 * @private
 */
export interface CreateUseFieldValueDependencies<
  Values extends Record<any, any>,
  ExtraContext extends Record<string, unknown>
> {
  useMainContext: (
    arg: UseMainContextArg<Values, ExtraContext>
  ) => UseMainContextReturn<Values, ExtraContext>;
  useFieldChangeValue: <Name extends ValuesFields<Values>>(
    arg: UseFieldChangeValueArg<Name>
  ) => UseFieldChangeValueReturn<Values, Name>;
}

/**
 * @private
 */
export const createUseFieldValue = <
  Values extends Record<any, any>,
  ExtraContext extends Record<string, unknown>
>({
  useMainContext,
  useFieldChangeValue,
}: CreateUseFieldValueDependencies<Values, ExtraContext>) => {
  /**
   * Logic around a fields value. Handles getting the field value out of the main context, the initial value, changing the value and if the value has changed.
   *
   * @param {UseFieldValueArg<Name>} arg
   * @returns {UseFieldValueReturn<Values, Name>}
   */
  const useFieldValue = <Name extends ValuesFields<Values>>({
    name,
  }: UseFieldValueArg<Name>): UseFieldValueReturn<Values, Name> => {
    const { values, initialValues } = useMainContext({
      shouldUpdate: (oldValue, newValue) => {
        return (["values", "initialValues"] as const).some(
          (v) => !isEqual(get(oldValue[v], name), get(newValue[v], name))
        );
      },
    });
    const { changeValue } = useFieldChangeValue<Name>({ name });

    const value = useMemo(() => get(values, name), [values, name]);
    const initialValue = useMemo(
      () => get(initialValues, name),
      [initialValues, name]
    );

    const hasChanged = useMemo(
      () => !isEqual(value, initialValue),
      [value, initialValue]
    );

    return useMemo(
      () => ({
        value,
        changeValue,
        initialValue,
        hasChanged,
      }),
      [value, changeValue, initialValue, hasChanged]
    );
  };

  return useFieldValue;
};
