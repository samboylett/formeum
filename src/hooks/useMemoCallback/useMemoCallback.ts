import { useCallback, useRef } from "react";

/**
 * Wraps an unmemoised function in a memoised function
 *
 * @param callback
 * @returns
 */
export const useMemoCallback = <A extends any[], R>(
  callback: (...args: A) => R
): ((...args: A) => R) => {
  const latest = useRef<(...args: A) => R>(callback);
  latest.current = callback;

  return useCallback<(...args: A) => R>(
    (...args: A): R => latest.current(...args),
    [latest]
  );
};
