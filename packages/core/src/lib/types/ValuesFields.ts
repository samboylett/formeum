import { L, O, S } from "ts-toolbelt";

export type ValuesPaths<Values> = L.Required<O.Paths<Values>>;

export type ValuesFields<Values> =
  ValuesPaths<Values> extends ReadonlyArray<string>
    ? S.Join<ValuesPaths<Values>, ".">
    : never;
