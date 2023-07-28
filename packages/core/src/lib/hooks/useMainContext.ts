import {
  FastContext,
  useFastContext,
  FastContextShouldUpdate,
} from "react-fast-context";
import { ContextMainInterface } from "../contexts/ContextMain";
import { BaseValues } from "../types/BaseValues";

/**
 * @private
 */
export interface CreateUseMainContextDependencies<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
  ContextMain: FastContext<ContextMainInterface<Values, ExtraContext>>;
}

export type UseMainContextReturn<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> = ContextMainInterface<Values, ExtraContext>;

export interface UseMainContextArg<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
  shouldUpdate: FastContextShouldUpdate<
    ContextMainInterface<Values, ExtraContext>
  >;
}

/**
 * @private
 */
export const createUseMainContext = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
>({
  ContextMain,
}: CreateUseMainContextDependencies<Values, ExtraContext>) => {
  /**
   * Use the form context.
   *
   * @param {UseMainContextArg<Values>} arg
   * @returns {UseMainContextReturn<Values>}
   */
  const useMainContext = ({
    shouldUpdate,
  }: UseMainContextArg<Values, ExtraContext>): UseMainContextReturn<
    Values,
    ExtraContext
  > => useFastContext(ContextMain, shouldUpdate);

  return useMainContext;
};
