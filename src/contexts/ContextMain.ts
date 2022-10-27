import { createContext } from "react";

export interface ContextMainInterface {
  values: any;
  setValues: (values: any) => void;
}

export const ContextMain = createContext<ContextMainInterface>({
  values: {},
  setValues: () => {}
});
