import { useMemo } from "react";
import { ValuesFields } from "../types/ValuesFields";
import { UseFieldBlurArg, UseFieldBlurReturn } from "./useFieldBlur";
import { UseFieldFocusArg, UseFieldFocusReturn } from "./useFieldFocus";
import { UseChangeHandlerReturn } from "./useChangeHandler";
import { UseFieldValueArg, UseFieldValueReturn } from "./useFieldValue";
import { DeepIndex } from "../types/DeepIndex";
import { UseFieldRefArg, UseFieldRefReturn } from "./useFieldRef";
import { UseFieldDisabledReturn } from "./useFieldDisabled";

export interface UseReactInputArg<Name> {
  name: Name;
}

export interface UseReactInputReturn<Values, Name extends ValuesFields<Values>>
  extends UseFieldBlurReturn,
    UseFieldFocusReturn,
    UseFieldRefReturn,
    UseFieldDisabledReturn {
  name: Name;
  value: DeepIndex<Values, Name>;
  onChange: UseChangeHandlerReturn<Values, Name>["changeValue"];
}

/**
 * @private
 */
export interface CreateUseReactInputDependencies<Values> {
  useFieldValue: <Name extends ValuesFields<Values>>(
    arg: UseFieldValueArg<Name>
  ) => UseFieldValueReturn<Values, Name>;
  useFieldFocus: <Name extends ValuesFields<Values>>(
    arg: UseFieldFocusArg<Name>
  ) => UseFieldFocusReturn;
  useFieldBlur: <Name extends ValuesFields<Values>>(
    arg: UseFieldBlurArg<Name>
  ) => UseFieldBlurReturn;
  useFieldRef: <Name extends ValuesFields<Values>>(
    arg: UseFieldRefArg<Name>
  ) => UseFieldRefReturn;
  useFieldDisabled: () => UseFieldDisabledReturn;
}

/**
 * @private
 */
export const createUseReactInput = <Values>({
  useFieldValue,
  useFieldFocus,
  useFieldBlur,
  useFieldRef,
  useFieldDisabled,
}: CreateUseReactInputDependencies<Values>) => {
  /**
   * Get the props to be used on a React style input, i.e. the change event should contain just the field value in the first argument rather than a change event.
   *
   * @param {UseReactInputArg<Name>}
   * @returns {UseReactInputReturn<Values, Name>}
   */
  const useReactInput = <Name extends ValuesFields<Values>>({
    name,
  }: UseReactInputArg<Name>): UseReactInputReturn<Values, Name> => {
    const { value, changeValue } = useFieldValue<Name>({ name });
    const { onFocus } = useFieldFocus<Name>({ name });
    const { onBlur } = useFieldBlur<Name>({ name });
    const { ref } = useFieldRef<Name>({ name });
    const { disabled } = useFieldDisabled();

    return useMemo(
      () => ({
        name,
        value,
        onBlur,
        onFocus,
        onChange: changeValue,
        ref,
        disabled,
      }),
      [name, value, onBlur, onFocus, changeValue, ref, disabled]
    );
  };

  return useReactInput;
};
