import { VerificationChannel } from './models';

export namespace AccountInfoComponent {
  export enum SectionTitles {
    Gender = 'Gender',
    Avatar = 'Profile Image',
    Location = 'Location'
  }

  export enum Labels {
    Gender = 'Gender',
    Female = 'Female',
    Male = 'Male',
    Birthday = 'Birthday'
  }

  export enum Placeholders {
    FirstName = 'First Name',
    LastName = 'Last Name',
  }

  export enum FieldKey {
    Avatar = 'avatar',
    Gender = 'gender',
    PhoneNumber = 'phoneNumber',
    Token = 'token',
    Location = 'location'
  }

  export const FieldNames = {
    [FieldKey.Gender]: 'gender',
    [FieldKey.PhoneNumber]: 'phoneNumber',
    [FieldKey.Token]: 'token'
  };

  export interface Errors {
    [FieldKey.Avatar]?: string;
    [FieldKey.Gender]?: string;
    [FieldKey.PhoneNumber]?: string;
    [FieldKey.Token]?: string;
    [FieldKey.Location]?: string;

  }

  export const firstNameMinVal = 1;
  export const firstNameMaxVal = 50;

  export const middleNameMaxVal = 50;

  export const lastNameMinVal = 1;
  export const lastNameMaxVal = 50;

  export const errorMessages = {
    [FieldKey.Avatar]: 'Upload a profile image.',
    [FieldKey.Token]: {
      invalidVerificationCode: 'Invalid verification code.',
      enterYourVerificationCode: 'Enter verification code.'
    },
    [FieldKey.Gender]: 'Select an option.',
    PhoneNumberEmpty: 'Enter a valid phone number.',
    PhoneNumberNotVerified: 'Verify phone number.',
    PhoneMissingCountryCode: 'Select country code.',
    [FieldKey.Location]: 'Enter a valid location.'
  };
}

export namespace PhoneValidationComponent {
  export const usPhoneNumberLenght = 10;
}

export namespace PhoneValidationFormComponent {
  export const sectionTitle = 'Verify Phone Number';

  export enum FieldNames {
    PhoneNumber = 'phoneNumber',
    PhoneToken = 'token',
    VefificationChannel = 'verificationChannel'
  }

  export enum Placeholders {
    PhoneNumber = 'Phone Number',
    PhoneToken = 'Enter Code'
  }

  export enum Buttons {
    Verify = 'Request Verification',
    Validate = 'Verify Phone',
    Cancel = 'Cancel'
  }

  export const resendCode = `Resend code or change phone number`;

  export const validationSucessful = 'Phone Verified';

  export const verificationMethod = {
    Text: {
      label: 'Text',
      value: VerificationChannel.Text
    },
    Call: {
      label: 'Call',
      value:  VerificationChannel.Call
    }
  };
}

export namespace LocationComponent {
  export const sectionTitle = 'Location';
  export const description = 'Please enter your home address.';
}
