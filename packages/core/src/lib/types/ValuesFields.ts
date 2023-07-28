export type Keyable = string | number | bigint | boolean | null | undefined;

export type GetChildKeys<
  Data extends Record<any, any>,
  Key extends keyof Data
> = Data[Key] extends Record<any, any> ? ValuesFields<Data[Key]> : never;

export type ValuesFields<Data extends Record<any, any>> =
  | keyof Data
  | {
      [Key in keyof Data]: Key extends Keyable
        ? GetChildKeys<Data, Key> extends Keyable
          ? `${Key}.${GetChildKeys<Data, Key>}`
          : never
        : never;
    }[keyof Data];
