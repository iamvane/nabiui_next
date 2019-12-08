import { Role } from '../constants/Roles';

export interface RegistrationType {
    email: string;
    password?: string;
    role?: string | Role;
    birthday?: string;
    referringCode?: string;
}
