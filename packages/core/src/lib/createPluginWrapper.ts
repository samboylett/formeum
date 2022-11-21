import { CreateBaseFormReturn } from "./types/CreateBaseFormReturn";
import { FormeumPlugin } from "./types/FormeumPlugin";
import { WrapPlugin } from "./types/WrapPlugin";

export const createPluginWrapper = <
  Values extends unknown,
  BaseReturn extends CreateBaseFormReturn<Values>
>(
  baseReturn: BaseReturn
): BaseReturn & WrapPlugin<Values, BaseReturn> => {
  return {
    ...baseReturn,

    plugin: <NewReturn extends BaseReturn>(
      plugin: FormeumPlugin<Values, BaseReturn, NewReturn>
    ) => {
      return createPluginWrapper<Values, NewReturn>(plugin.wrap(baseReturn));
    },
  };
};
