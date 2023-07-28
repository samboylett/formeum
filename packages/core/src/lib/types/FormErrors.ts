import { BaseValues } from "./BaseValues";
import { ValuesFields } from "./ValuesFields";

export type FormErrors<Values extends BaseValues> = Partial<
  Record<ValuesFields<Values>, string>
>;
