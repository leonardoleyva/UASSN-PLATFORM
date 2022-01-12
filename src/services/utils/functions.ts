import { environment } from 'src/environments/environment';
import { BucketPath, Error } from './type';

export const isError = <T>(error: Error<T>): error is Error<T> => {
  return error.code !== undefined;
};

/**
 * 
 * @param id This id can belong to an object from any type of bucket path
 * @param bucketPath 
 * @returns Image URL
 */
export const getImageURL = (id: string, bucketPath: BucketPath): string => {
  return `${environment.STORAGE_URL}${bucketPath}%2F${id}.jpg?alt=media`
}
