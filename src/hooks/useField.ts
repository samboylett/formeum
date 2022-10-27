import { O } from 'ts-toolbelt';

export interface UseFieldArg<Values> {
  name: O.Paths<Values>;
}

export interface UseFieldReturn<Values> {
}

export const createUseField = <Values>() => {
  const useField = ({ name }: UseFieldArg<Values>): UseFieldReturn<Values> => {
    return {};
  };

  return useField;
};
