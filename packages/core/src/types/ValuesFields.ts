import { O, S } from 'ts-toolbelt';

export type ValuesFields<Values> = S.Join<O.Paths<Values> & string[], '.'>;
