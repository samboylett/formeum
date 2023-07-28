import { Formeum } from "./Formeum";

/**
 * Create fully typed context, hooks and components for a form based on the generic type argument.
 */
export const createForm = <Values extends Record<any, any>>() =>
  new Formeum<Values>({});
