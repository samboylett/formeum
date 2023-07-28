import { MutableRefObject } from "react";
import {
  FastContext,
  useCurrentContext as useCurrentContextBase,
} from "react-fast-context";
import { ContextMainInterface } from "../contexts/ContextMain";
import { BaseValues } from "../types/BaseValues";

/**
 * @private
 */
export interface CreateUseCurrentContextDependencies<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
  ContextMain: FastContext<ContextMainInterface<Values, ExtraContext>>;
}

export type UseCurrentContextReturn<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> = Readonly<MutableRefObject<ContextMainInterface<Values, ExtraContext>>>;

/**
 * @private
 */
export const createUseCurrentContext = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
>({
  ContextMain,
}: CreateUseCurrentContextDependencies<Values, ExtraContext>) => {
  /**
   * Use the context as a ref object, and never trigger a re-render.
   *
   * @returns {UseCurrentContextReturn<Values>}
   */
  const useCurrentContext = (): UseCurrentContextReturn<Values, ExtraContext> =>
    useCurrentContextBase(ContextMain);

  return useCurrentContext;
};
