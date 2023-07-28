import { Formeum } from "./Formeum";
import { BaseValues } from "./types/BaseValues";

/**
 * Create fully typed context, hooks and components for a form based on the generic type argument.
 */
export const createForm = <Values extends BaseValues>() =>
  new Formeum<Values>({});
