import { ArrayFields } from "./ArrayFields";
import { BaseValues } from "./BaseValues";

export type ValuesFields<Data extends BaseValues> = (string & keyof Data) | ArrayFields<Data>;
