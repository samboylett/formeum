import { FormeumError } from "./FormeumError";

/**
 * Error thrown when trying to use a form context but the component is not rendered in a provider.
 */
export class NoContextError extends FormeumError {}
