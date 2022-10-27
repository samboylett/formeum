import { createFormHandler } from "./components/FormHandler";
import { CreateFormArg } from "./types/CreateFormArg";

export function createForm<Values extends unknown>(arg: CreateFormArg) {
  const FormHandler = createFormHandler<Values>(arg);

  return {
    FormHandler,
  } as const;
}
