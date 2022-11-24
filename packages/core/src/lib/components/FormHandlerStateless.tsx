import { ReactElement, ReactNode, useMemo } from "react";
import { FastContext } from "react-fast-context";
import { ContextMainInterface } from "../contexts/ContextMain";
import {
  UseFormHandlerStatelessArg,
  UseFormHandlerStatelessReturn,
} from "../hooks/useFormHandlerStateless";

export interface FormHandlerStatelessProps<Values>
  extends UseFormHandlerStatelessArg<Values> {
  children: ReactNode;
}

/**
 * @private
 */
export interface CreateFormHandlerStatelessDependencies<Values, ExtraContext extends Record<string, unknown>> {
  ContextMain: FastContext<ContextMainInterface<Values, ExtraContext>>;
  useFormHandlerStateless: (
    arg: UseFormHandlerStatelessArg<Values>
  ) => UseFormHandlerStatelessReturn<Values, ExtraContext>;
}

/**
 * @private
 */
export const createFormHandlerStateless = <Values extends unknown, ExtraContext extends Record<string, unknown>>({
  ContextMain,
  useFormHandlerStateless,
}: CreateFormHandlerStatelessDependencies<Values, ExtraContext>) => {
  /**
   * Get the form handler using the hook `useFormHandlerStateless` and render the context provider.
   *
   * @param {FormHandlerStatelessProps<Values>} props
   * @returns {ReactElement}
   */
  const FormHandlerStateless = ({
    children,
    ...rest
  }: FormHandlerStatelessProps<Values>): ReactElement => {
    const handler = useFormHandlerStateless(rest);

    return (
      <ContextMain.Provider value={handler}>
        {useMemo(() => children, [children])}
      </ContextMain.Provider>
    );
  };

  return FormHandlerStateless;
};
