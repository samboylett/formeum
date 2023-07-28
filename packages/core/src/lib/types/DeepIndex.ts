import { BaseKeys } from "./BaseKeys";

export type Idx<T, K extends BaseKeys> = K extends keyof T ? T[K] : never;

export type DeepIndex<T, K extends BaseKeys> = T extends object
  ? K extends `${infer F}.${infer R}`
    ? DeepIndex<Idx<T, F>, R> extends infer D
      ? D
      : never
    : Idx<T, K>
  : never;
