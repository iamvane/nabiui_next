export namespace LoginComponent {
  export const pageTitle = 'Log In';
}

export namespace LoginFormComponent {

  export enum Text {
    Login = 'Log In',
    LoginFacebook = 'Log in with Facebook',
    SingUp = 'Sign Up',
    ForgotPassword = 'Forgot your password?',
  }

  export const registerInvite = 'Don\'t have an account? {signUpReplace}';
  export const singUpPlaceholder = '{signUpReplace}';

  export enum Placeholders {
    Email = 'Email address',
    Password = 'Password'
  }

  export enum FieldNames {
    Email = 'email',
    Password = 'password',
  }

  export enum Ids {
    Email = 'email',
    Password = 'password',
  }
}
