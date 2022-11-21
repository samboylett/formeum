import { CreateBaseFormReturn } from "./CreateBaseFormReturn";

export interface FormeumPlugin<
  Values extends unknown,
  BaseReturn extends CreateBaseFormReturn<Values>,
  NewReturn extends BaseReturn,
> {
  wrap: (base: BaseReturn) => NewReturn;
}
