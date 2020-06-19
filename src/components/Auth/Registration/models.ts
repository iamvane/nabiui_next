import { Role } from './constants';

export interface RegistrationType {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string | Role;
  birthday?: string;
  location?: string;
  lat?: string;
  lng?: string;
  phoneNumber?: string;
  referringCode?: string;
  reference?: string;
  termsAccepted?: boolean;
}
