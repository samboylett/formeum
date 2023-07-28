import { useMemo } from "react";
import { ValuesFields } from "../types/ValuesFields";
import { UseFieldBlurArg, UseFieldBlurReturn } from "./useFieldBlur";
import { UseFieldFocusArg, UseFieldFocusReturn } from "./useFieldFocus";
import {
  UseChangeHandlerArg,
  UseChangeHandlerReturn,
} from "./useChangeHandler";
import { UseFieldValueArg, UseFieldValueReturn } from "./useFieldValue";
import { DeepIndex } from "../types/DeepIndex";
import { UseFieldRefArg, UseFieldRefReturn } from "./useFieldRef";
import { UseFieldDisabledReturn } from "./useFieldDisabled";
import { BaseValues } from "../types/BaseValues";

export interface UseHTMLCheckboxArg<
  Values extends BaseValues,
  Name extends ValuesFields<Values>
> {
  name: DeepIndex<Values, Name> extends boolean ? Name : never;
}

export interface UseHTMLCheckboxReturn<
  Values extends BaseValues,
  Name extends ValuesFields<Values>
> extends UseFieldBlurReturn,
    UseFieldFocusReturn,
    UseFieldRefReturn,
    UseFieldDisabledReturn {
  name: Name;
  checked: boolean;
  value: Name;
  onChange: UseChangeHandlerReturn<Values, Name>["handleCheckboxEvent"];
  type: "checkbox";
}

/**
 * @private
 */
export interface CreateUseHTMLCheckboxDependencies<Values extends BaseValues> {
  useFieldValue: <Name extends ValuesFields<Values>>(
    arg: UseFieldValueArg<Name>
  ) => UseFieldValueReturn<Values, Name>;
  useFieldFocus: <Name extends ValuesFields<Values>>(
    arg: UseFieldFocusArg<Name>
  ) => UseFieldFocusReturn;
  useFieldBlur: <Name extends ValuesFields<Values>>(
    arg: UseFieldBlurArg<Name>
  ) => UseFieldBlurReturn;
  useChangeHandler: <Name extends ValuesFields<Values>>(
    arg: UseChangeHandlerArg<Name>
  ) => UseChangeHandlerReturn<Values, Name>;
  useFieldRef: <Name extends ValuesFields<Values>>(
    arg: UseFieldRefArg<Name>
  ) => UseFieldRefReturn;
  useFieldDisabled: () => UseFieldDisabledReturn;
}

/**
 * @private
 */
export const createUseHTMLCheckbox = <Values>({
  useFieldValue,
  useFieldFocus,
  useFieldBlur,
  useChangeHandler,
  useFieldRef,
  useFieldDisabled,
}: CreateUseHTMLCheckboxDependencies<Values>) => {
  /**
   * Get the props to use for a native HTML checkbox input as a boolean value.
   *
   * @param {UseHTMLCheckboxArg<Values, Name>} arg
   * @returns {UseHTMLCheckboxReturn<Values, Name>}
   */
  const useHTMLCheckbox = <Name extends ValuesFields<Values>>({
    name,
  }: UseHTMLCheckboxArg<Values, Name>): UseHTMLCheckboxReturn<Values, Name> => {
    const { value } = useFieldValue<Name>({ name });
    const { onFocus } = useFieldFocus<Name>({ name });
    const { onBlur } = useFieldBlur<Name>({ name });
    const { handleCheckboxEvent } = useChangeHandler<Name>({ name });
    const { ref } = useFieldRef<Name>({ name });
    const { disabled } = useFieldDisabled();

    const checked = Boolean(value);

    return useMemo(
      () => ({
        name,
        value: name,
        checked,
        onBlur,
        onFocus,
        onChange: handleCheckboxEvent,
        type: "checkbox",
        ref,
        disabled,
      }),
      [name, checked, onBlur, onFocus, handleCheckboxEvent, ref, disabled]
    );
  };

  return useHTMLCheckbox;
};
