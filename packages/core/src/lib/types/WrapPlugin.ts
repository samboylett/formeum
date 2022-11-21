import { CreateBaseFormReturn } from "./CreateBaseFormReturn";
import { FormeumPlugin } from "./FormeumPlugin";

export interface WrapPlugin<
  Values extends unknown,
  BaseReturn extends CreateBaseFormReturn<Values>
> {
  /**
   * Load a plugin to this form instance. Returns the new form instance and is chainable.
   */
  plugin: <NewReturn extends BaseReturn>(
    plugin: FormeumPlugin<Values, BaseReturn, NewReturn>
  ) => NewReturn & WrapPlugin<Values, BaseReturn>;
}
