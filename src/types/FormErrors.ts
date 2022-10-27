export type FormErrors<Values> = Partial<{
  [K in keyof Values]: Values[K] extends object ? FormErrors<Values[K]> : string;
}>;
