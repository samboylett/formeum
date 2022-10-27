import { createFormHandler } from "./components/FormHandler";
import { createContextMain } from "./contexts/ContextMain";
import { createContextValues } from "./contexts/ContextValues";
import { createUseFormHandler } from "./hooks/useFormHandler";
import { createUseGetFormContexts } from "./hooks/useGetFormContexts";
import { CreateFormArg } from "./types/CreateFormArg";

export function createForm<Values extends unknown>(arg: CreateFormArg) {
  const useFormHandler = createUseFormHandler<Values>();
  const useGetFormContexts = createUseGetFormContexts<Values>();

  const ContextMain = createContextMain<Values>();
  const ContextValues = createContextValues<Values>();
  const FormHandler = createFormHandler<Values>(arg, {
    ContextMain,
    ContextValues,
    useFormHandler,
    useGetFormContexts,
  });

  return {
    useFormHandler,
    useGetFormContexts,

    ContextMain,
    ContextValues,
    FormHandler,
  } as const;
}
