import { BaseValues } from "./BaseValues";
import { ValuesFields } from "./ValuesFields";

export type FormTouched<Values extends BaseValues> = Set<ValuesFields<Values>>;
