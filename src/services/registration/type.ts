import { BasicUserData } from '../user/type';
import { RegistrationErrors } from './error';

export interface RegistrationBaseUser extends Omit<BasicUserData, 'userId' | 'profileImg'> {
  email: string;
  password: string;
  studentID: string;
}

// Error typing

export type RegistrationError = keyof typeof RegistrationErrors;
