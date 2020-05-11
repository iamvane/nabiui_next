export enum Gender {
  male = 'male',
  female = 'female',
  undislcosed = 'undisclosed'
}

export enum VerificationChannel {
  Text = 'sms',
  Call = 'call'
}

export interface AccountInfoType {
  middleName?: string;
  gender?: Gender | string;
  phoneNumber?: string;
  location?: string;
  lat?: string;
  lng?: string;
  isPhoneVerified?: boolean;
}
