import { BaseValues } from "./BaseValues";

export type ArrayFields<Data extends BaseValues> =
  | [keyof Data]
  | [
      ...{
        [Key in keyof Data]: Data[Key] extends BaseValues
          ? [Key, ...ArrayFields<Data[Key]>]
          : never;
      }[keyof Data]
    ];
