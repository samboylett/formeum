import { ValuesFields } from "./ValuesFields";

export type FormErrors<Values> = Partial<Record<ValuesFields<Values>, string>>;