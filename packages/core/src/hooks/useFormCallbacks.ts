import { MutableRefObject, useEffect, useMemo, useState } from 'react';
import { DeepIndex } from '../types/DeepIndex';
import { UseMainContextArg, UseMainContextReturn } from './useMainContext';
import { get, isEqual, pick } from 'lodash';
import { ValuesFields } from '../types/ValuesFields';
import useEventCallback from 'use-event-callback';
import { UseFieldTouchedArg, UseFieldTouchedReturn } from './useFieldTouched';
import { UseCurrentContextReturn } from './useCurrentContext';
import { UseFieldChangeValueArg, UseFieldChangeValueReturn } from './useFieldChangeValue';
import { UseFormHandlerReturn } from './useFormHandler';

export type UseFormCallbacksReturn<Values> = Readonly<MutableRefObject<Pick<
  UseFormHandlerReturn<Values>,
  | 'submitForm'
  | 'setValues'
  | 'setErrors'
  | 'setTouched'
  | 'setFieldValue'
  | 'setFieldError'
  | 'setFieldTouched'
  | 'runValidation'
>>>;

export interface CreateUseFormCallbacksDependencies<Values> {
  useCurrentContext: () => UseCurrentContextReturn<Values>;
}

export const createUseFormCallbacks = <Values>({ useCurrentContext }: CreateUseFormCallbacksDependencies<Values>) => {
  /**
   * Get all functions from the form handler. Will never trigger a re-render.
   * 
   * @returns {UseFormCallbacksReturn<Values>}
   */
  const useFormCallbacks = (): UseFormCallbacksReturn<Values> => {
    const contextRef = useCurrentContext();

    return useMemo<UseFormCallbacksReturn<Values>>(() => ({
      get current() {
        return pick(
          contextRef.current,
          'submitForm',
          'setValues',
          'setErrors',
          'setTouched',
          'setFieldValue',
          'setFieldError',
          'setFieldTouched',
          'runValidation',
        );
      }
    }), [contextRef])
  };

  return useFormCallbacks;
};
