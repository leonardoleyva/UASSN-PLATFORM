import { Error } from '../utils/type';
import { RegistrationError } from './type';

export enum RegistrationErrors {
  'auth/email-already-in-use' = 'Registration Error - Email already exists',
  'auth/internal-error' = 'Registration Error - Internal error',
  'auth/invalid-email' = 'Registration Error - Invalid email',
}

export const handleErrorCreateUser = (error: any): Error<RegistrationError> => {
  const code = error.code as RegistrationError;
  return {
    code,
    message: RegistrationErrors[code],
  };
};
