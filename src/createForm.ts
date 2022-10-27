import { createFormHandler } from "./components/FormHandler";
import { createContextMain } from "./contexts/ContextMain";
import { createContextValues } from "./contexts/ContextValues";
import { createUseFormHandler } from "./hooks/useFormHandler";
import { CreateFormArg } from "./types/CreateFormArg";

export function createForm<Values extends unknown>(arg: CreateFormArg) {
  const useFormHandler = createUseFormHandler<Values>();

  const ContextMain = createContextMain<Values>();
  const ContextValues = createContextValues<Values>();
  const FormHandler = createFormHandler<Values>(arg, {
    ContextMain,
    ContextValues,
    useFormHandler,
  });

  return {
    ContextMain,
    ContextValues,
    FormHandler,
  } as const;
}
