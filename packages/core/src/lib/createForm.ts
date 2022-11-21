import { createBaseForm } from "./createBaseForm";
import { createPluginWrapper } from "./createPluginWrapper";
import { CreateBaseFormReturn } from "./types/CreateBaseFormReturn";
import { WrapPlugin } from "./types/WrapPlugin";

/**
 * Create fully typed context, hooks and components for a form based on the generic type argument.
 */
export function createForm<
  Values extends unknown
>(): CreateBaseFormReturn<Values> &
  WrapPlugin<Values, CreateBaseFormReturn<Values>> {
  const form = createBaseForm<Values>();

  return createPluginWrapper<Values, CreateBaseFormReturn<Values>>(form);
}
