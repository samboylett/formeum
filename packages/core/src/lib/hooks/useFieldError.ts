import { useMemo } from "react";
import { UseMainContextArg, UseMainContextReturn } from "./useMainContext";
import { get, isEqual } from "lodash";
import { ValuesFields } from "../types/ValuesFields";
import useEventCallback from "use-event-callback";

export interface UseFieldErrorArg<Name> {
  name: Name;
}

export interface UseFieldErrorReturn {
  error: string | undefined;

  /**
   * Set the fields error state.
   *
   * @param {string|undefined} error
   */
  changeError: (error: string | undefined) => void;
}

/**
 * @private
 */
export interface CreateUseFieldErrorDependencies<
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
export const createUseFieldError = <
  Values,
  ExtraContext extends Record<string, unknown>
>({
  useMainContext,
}: CreateUseFieldErrorDependencies<Values, ExtraContext>) => {
  /**
   * Get or change the fields error.
   *
   * @param {UseFieldErrorArg<Name>} arg
   * @returns {UseFieldErrorReturn}
   */
  const useFieldError = <Name extends ValuesFields<Values>>({
    name,
  }: UseFieldErrorArg<Name>): UseFieldErrorReturn => {
    const { errors, setFieldError } = useMainContext({
      shouldUpdate: (oldValue, newValue) => {
        return !isEqual(get(oldValue.errors, name), get(newValue.errors, name));
      },
    });

    const error = useMemo(() => errors[name], [errors, name]);

    const changeError = useEventCallback((newError: string | undefined) => {
      setFieldError(name, newError);
    });

    return useMemo(
      () => ({
        error,
        changeError,
      }),
      [error, changeError]
    );
  };

  return useFieldError;
};
