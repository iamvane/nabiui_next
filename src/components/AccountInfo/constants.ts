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
    MiddleName = 'Middle Name',
  }

  export enum FieldKey {
    FirstName = 'firstName',
    LastName = 'lastName',
    MiddleName = 'middleName',
    Gender = 'gender',
    PhoneNumber = 'phoneNumber',
    Token = 'token',
    Location = 'location'
  }

  export const FieldNames = {
    [FieldKey.FirstName]: 'firstName',
    [FieldKey.LastName]: 'lastName',
    [FieldKey.MiddleName]: 'middleName',
    [FieldKey.Gender]: 'gender',
    [FieldKey.PhoneNumber]: 'phoneNumber',
    [FieldKey.Token]: 'token'
  };

  export interface Errors {
    [FieldKey.FirstName]?: string;
    [FieldKey.LastName]?: string;
    [FieldKey.MiddleName]?: string;
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
    [FieldKey.FirstName]: {
      emptyFirstName: 'Enter your first name, up to {maxFirstNameValue} characters.'.replace(
        '{maxFirstNameValue}',
        firstNameMaxVal.toLocaleString()
      ),
      invalidFirstName: 'Enter a valid first name.'
    },
    [FieldKey.MiddleName]: {
      emptyMiddleName: 'Enter your middle name, up to {maxMiddleNameValue} characters.'.replace(
        '{maxMiddleNameValue}',
        middleNameMaxVal.toLocaleString()
      ),
      invalidMiddleName: 'Enter a valid middle name.'

    },
    [FieldKey.LastName]: {
      emptyLastName: 'Enter your last name, up to {maxLastNameValue} characters.'.replace(
        '{maxLastNameValue}',
        lastNameMaxVal.toLocaleString()
      ),
      invalidLastName: 'Enter a valid last name.'
    },
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
    PhoneToken = 'Verification Token'
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

export namespace MiddleNameModalComponent {
  export const title = 'Missing Middle Name';
  export const message = 'Looks like you didn’t provide a middle name. Please enter it below, if applicable.';

  export const noMiddleName = `I don't have one`;
  export const applyButton = 'Apply';
}
