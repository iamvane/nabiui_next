import { UserType } from './UserModel';

/**
 * State for firing redirect
 * @interface RedirectState
 */
export interface RedirectState {
  fireRedirect: boolean;
}

export interface AuthResponse {
  token: string;
  _id: string;
}

export interface RegistrationResponse extends
  UserType,
  AuthResponse {}
