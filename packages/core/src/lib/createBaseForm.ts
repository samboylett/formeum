import { Formeum } from "./Formeum";

/**
 * Returns a form which plugins can not be added to.
 */
export function createBaseForm<Values extends unknown>() {
  return new Formeum<Values>();
}
