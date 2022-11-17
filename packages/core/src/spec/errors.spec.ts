import { FormeumError, AlreadySubmittingError, NoContextError } from '../lib';

describe("errors", () => {
  test("FormeumError extends Error", () => {
    expect(new FormeumError("msg")).toEqual(expect.any(Error));
  });

  test("AlreadySubmittingError extends FormeumError", () => {
    expect(new AlreadySubmittingError("msg")).toEqual(expect.any(FormeumError));
  });

  test("NoContextError extends FormeumError", () => {
    expect(new NoContextError("msg")).toEqual(expect.any(FormeumError));
  });
});
