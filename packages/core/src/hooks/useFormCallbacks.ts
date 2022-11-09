import { useMemo } from 'react'
import { pick } from 'lodash'
import { UseCurrentContextReturn } from './useCurrentContext'
import { UseFormHandlerReturn } from './useFormHandler'

export type UseFormCallbacksReturn<Values> = Pick<
  UseFormHandlerReturn<Values>,
  | 'submitForm'
  | 'setValues'
  | 'setErrors'
  | 'setTouched'
  | 'setFieldValue'
  | 'setFieldError'
  | 'setFieldTouched'
  | 'runValidation'
>;

/**
 * @private
 */
export interface CreateUseFormCallbacksDependencies<Values> {
  useCurrentContext: () => UseCurrentContextReturn<Values>;
}

/**
 * @private
 */
export const createUseFormCallbacks = <Values>({
  useCurrentContext
}: CreateUseFormCallbacksDependencies<Values>) => {
  /**
   * Get all functions from the form handler. Will never trigger a re-render.
   *
   * @returns {UseFormCallbacksReturn<Values>}
   */
  const useFormCallbacks = (): UseFormCallbacksReturn<Values> => {
    const contextRef = useCurrentContext()

    return useMemo<UseFormCallbacksReturn<Values>>(
      () =>
        pick(
          contextRef.current,
          'submitForm',
          'setValues',
          'setErrors',
          'setTouched',
          'setFieldValue',
          'setFieldError',
          'setFieldTouched',
          'runValidation'
        ),
      [contextRef]
    )
  }

  return useFormCallbacks
}
