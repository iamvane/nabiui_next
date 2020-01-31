import { Role } from './constants';

export interface RegistrationType {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string | Role;
  birthday?: string;
  referringCode?: string;
  reference?: string;
  termsAccepted?: boolean;
}
