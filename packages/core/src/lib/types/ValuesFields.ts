import { L, O, S } from "ts-toolbelt";

export type ValuesFields<Values> = S.Join<L.Required<O.Paths<Values>>, ".">;
