export type FormErrors<Values extends object> = Partial<{
  [K in keyof Values]: Values[K] extends object ? FormErrors<Values[K]> : string;
}>;
