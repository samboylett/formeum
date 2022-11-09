import { useMemo } from 'react'
import { UseMainContextArg, UseMainContextReturn } from './useMainContext'
import { ValuesFields } from '../types/ValuesFields'
import useEventCallback from 'use-event-callback'

export interface UseFieldTouchedArg<Name> {
  name: Name;
}

export interface UseFieldTouchedReturn {
  isTouched: boolean;

  /**
   * Set whether the field is marked as touched or not.
   *
   * @param {boolean} nextIsTouched
   */
  setIsTouched: (nextIsTouched: boolean) => void;
}

/**
 * @private
 */
export interface CreateUseFieldTouchedDependencies<Values> {
  useMainContext: (
    arg: UseMainContextArg<Values>
  ) => UseMainContextReturn<Values>;
}

/**
 * @private
 */
export const createUseFieldTouched = <Values>({
  useMainContext
}: CreateUseFieldTouchedDependencies<Values>) => {
  /**
   * Check and change if the field has been touched or not.
   *
   * @param {UseFieldTouchedArg<Name>} arg
   * @returns {UseFieldTouchedReturn}
   */
  const useFieldTouched = <Name extends ValuesFields<Values>>({
    name
  }: UseFieldTouchedArg<Name>): UseFieldTouchedReturn => {
    const { touched, setFieldTouched } = useMainContext({
      shouldUpdate: (oldValue, newValue) => {
        return oldValue.touched.has(name) !== newValue.touched.has(name)
      }
    })

    const isTouched = useMemo(() => touched.has(name), [touched, name])

    const setIsTouched = useEventCallback((nextIsTouched: boolean) => {
      if (nextIsTouched === isTouched) return

      setFieldTouched(name, nextIsTouched)
    })

    return useMemo(
      () => ({
        isTouched,
        setIsTouched
      }),
      [isTouched, setIsTouched]
    )
  }

  return useFieldTouched
}
