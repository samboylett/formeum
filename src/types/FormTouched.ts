import { ValuesFields } from "./ValuesFields";

export type FormTouched<Values> = Set<ValuesFields<Values>>;