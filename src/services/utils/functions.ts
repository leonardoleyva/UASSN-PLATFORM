import { Error } from './type';

export const isError = <T>(error: Error<T>): error is Error<T> => {
  return error.code !== undefined;
};
