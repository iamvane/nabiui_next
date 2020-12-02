import { Routes } from "../../common/constants/Routes";

export namespace PasswordRecoveryComponent {
  export const pageTitle = 'Password Recovery';

  export enum Text {
    PasswordRecovery = 'Submit'
  }

  export enum Placeholders {
    Email = 'Email address'
  }

  export enum FieldNames {
    Email = 'email'
  }

  export enum Ids {
    Email = 'email',
  }

  export interface Errors {
    email?: string;
  }

  export const defaultErrors: Errors = {
  };

  export const errorMessages = {
    noValue: 'Enter email address.',
    invalidEmail: 'Enter a valid email address.'
  };
}

export namespace SetPasswordComponent {
  export const pageTitle = 'Set New Password';

  export enum Text {
    SetPassword = 'Submit'
  }

  export enum Placeholders {
    Password = 'Enter new password',
    ConfirmPassword = 'Confirm password'
  }

  export enum FieldNames {
    Password = 'password',
    ConfirmPassword = 'confirmPassword'
  }

  export enum Ids {
    Password = 'password',
    ConfirmPassword = 'confirmPassword'
  }
  export interface SetPasswordErrors {
    password?: string;
    confirmPassword?: string;
  }

  export const defaultErrors: SetPasswordErrors = {
  };

  export const errorMessages = {
    noValue: 'Enter password.',
    invalidPassword: 'Enter a valid passowrd. It must contain at least 5 characters, a letter and a number.',
    noMatch: 'Passwords do not match.'
  };
}

export const menuItems = [
  {
    label: 'Create Account',
    route: Routes.Registration
  },
  {
    label: 'Login',
    route: Routes.Login
  }
];

export const headerMenuItems = [
  {
    label: 'Create Account',
    route: Routes.Registration
  }
];