import { FormeumError } from "./FormeumError";

/**
 * Error thrown when trying to submit a form which is already in mid submission.
 */
export class AlreadySubmittingError extends FormeumError {}