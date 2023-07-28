import { ReactElement, ReactNode, useMemo } from "react";
import { FastContext } from "react-fast-context";
import { ContextMainInterface } from "../contexts/ContextMain";
import {
  UseFormHandlerArg,
  UseFormHandlerReturn,
} from "../hooks/useFormHandler";
import { BaseValues } from "../types/BaseValues";

export interface FormHandlerProps<Values extends BaseValues>
  extends UseFormHandlerArg<Values> {
  children: ReactNode;
}

/**
 * @private
 */
export interface CreateFormHandlerDependencies<
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
> {
  ContextMain: FastContext<ContextMainInterface<Values, ExtraContext>>;
  useFormHandler: (
    arg: UseFormHandlerArg<Values>
  ) => UseFormHandlerReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createFormHandler = <
  Values extends BaseValues,
  ExtraContext extends Record<string, unknown>
>({
  ContextMain,
  useFormHandler,
}: CreateFormHandlerDependencies<Values, ExtraContext>) => {
  /**
   * Get the form handler using the hook `useFormHandler` and render the context provider.
   *
   * @param {FormHandlerProps<Values>} props
   * @returns {ReactElement}
   */
  const FormHandler = ({
    children,
    ...rest
  }: FormHandlerProps<Values>): ReactElement => {
    const handler = useFormHandler(rest);

    return (
      <ContextMain.Provider value={handler}>
        {useMemo(() => children, [children])}
      </ContextMain.Provider>
    );
  };

  return FormHandler;
};
