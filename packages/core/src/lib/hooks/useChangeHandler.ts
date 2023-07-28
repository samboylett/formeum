import { ChangeEvent, useMemo } from "react";
import { DeepIndex } from "../types/DeepIndex";
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from "use-event-callback";
import {
  UseFieldChangeValueArg,
  UseFieldChangeValueReturn,
} from "./useFieldChangeValue";
import { BaseValues } from "../types/BaseValues";

export interface UseChangeHandlerArg<Name> {
  name: Name;
}

export interface UseChangeHandlerReturn<
  Values extends BaseValues,
  Name extends ValuesFields<Values>
> extends UseFieldChangeValueReturn<Values, Name> {
  /**
   * Handle a change event for a native input. Only supports string values.
   *
   * @param {ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} event
   */
  handleChangeEvent: DeepIndex<Values, Name> extends string
    ? (
        event: ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      ) => void
    : never;

  /**
   * Handle a change event for a native checkbox. Only supports boolean values.
   *
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  handleCheckboxEvent: DeepIndex<Values, Name> extends boolean
    ? (event: ChangeEvent<HTMLInputElement>) => void
    : never;
}

/**
 * @private
 */
export interface CreateUseChangeHandlerDependencies<Values extends BaseValues> {
  useFieldChangeValue: <Name extends ValuesFields<Values>>(
    arg: UseFieldChangeValueArg<Name>
  ) => UseFieldChangeValueReturn<Values, Name>;
}

/**
 * @private
 */
export const createUseChangeHandler = <Values extends BaseValues>({
  useFieldChangeValue,
}: CreateUseChangeHandlerDependencies<Values>) => {
  /**
   * Get native change handlers for a field.
   *
   * @param {UseChangeHandlerArg<Name>} arg
   * @returns {UseChangeHandlerReturn<Values, Name>}
   */
  const useChangeHandler = <Name extends ValuesFields<Values>>({
    name,
  }: UseChangeHandlerArg<Name>): UseChangeHandlerReturn<Values, Name> => {
    const { changeValue } = useFieldChangeValue<Name>({ name });

    const handleChangeEvent: any = useEventCallback(
      (
        event: ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      ) => {
        const { value } = event.target || event.currentTarget;

        changeValue(value as any);
      }
    );

    const handleCheckboxEvent: any = useEventCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target || event.currentTarget;

        changeValue(checked as any);
      }
    );

    return useMemo(
      () => ({
        changeValue,
        handleChangeEvent,
        handleCheckboxEvent,
      }),
      [changeValue, handleChangeEvent, handleCheckboxEvent]
    );
  };

  return useChangeHandler;
};
