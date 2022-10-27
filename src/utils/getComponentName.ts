import { FC } from "react";
import { CreateFormArg } from "../types/CreateFormArg";

export const getComponentName = (arg: CreateFormArg, Component: FC<any>) => {
  return [arg.componentNamePrefix, Component.name, arg.componentNameSuffix].filter(Boolean).join('');
};
