import { S } from "ts-toolbelt";
import { BaseKeys } from "./BaseKeys";

export type Idx<T, K extends BaseKeys> = K extends keyof T ? T[K] : never;

export type DeepIndexString<T, K extends BaseKeys> = T extends object
  ? K extends `${infer F}.${infer R}`
    ? DeepIndexString<Idx<T, F>, R>
    : Idx<T, K>
  : never;

export type DeepIndexArray<T, K extends Array<string>> = DeepIndexString<T, S.Join<K, ".">>;

export type DeepIndex<T, K extends BaseKeys | Array<BaseKeys>> =
  K extends Array<string>
  ? DeepIndexArray<T, K>
  : K extends BaseKeys
  ? DeepIndexString<T, K>
  : never;