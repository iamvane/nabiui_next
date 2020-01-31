export namespace RegistrationComponent {
  export const pageTitle = 'Registration';
  export const minimumAge = 16;
}

export enum Role {
  student = 'student',
  instructor = 'instructor',
  parent = 'parent'
}

export namespace RegistrationFormComponent {
  export const SubmitText = 'Submit';

  export const birthday = 'Birthday';

  export const IAmA = 'I am a';

  export enum FieldKey {
    Email = 'email',
    Password = 'password',
    FirstName = 'firstName',
    LastName = 'lastName',
    Reference = 'reference'
  }

  export enum Labels {
    ProspectiveStudent = 'Student',
    ParentGuardian = 'Parent or guardian',
  }

  export enum Placeholders {
    Email = 'Email',
    Password = 'Password',
    FirstName = 'First Name',
    LastName = 'Last Name',
    Reference = 'How did you hear about us?'
  }

  export enum FieldNames {
    Role = 'role',
    Email = 'email',
    Password = 'password',
    FirstName = 'firstName',
    LastName = 'lastName',
    Reference = 'reference',
    AgreeWithTerms = 'agreeWithTerms'
  }

  export enum Ids {
    Role = 'role',
    Email = 'email',
    Password = 'password',
    FirstName = 'firstName',
    LastName = 'lastName',
  }

  export enum RegisterText {
    Student = 'Register as a student',
    Parent = 'Register as parent/guardian',
    Instructor = 'Register as an instructor',
  }

  export enum ErrorMessages {
    FirstName = 'Enter a valid first name.',
    LastName = 'Enter a valid last name.',
    Email = 'Invalid email. Enter a valid email address.',
    Password = 'Invalid password. Must contain at least 5 characters, a letter and a number.',
    Reference = 'Select an option.'
  }

  export const referenceOptions = [
    {
      label: 'Care.com',
      value: 'care.com'
    },
    {
      label: 'Facebook',
      value: 'facebook'
    },
    {
      label: 'Indeed Jobs',
      value: 'indeed jobs'
    },
    {
      label: 'Instagram',
      value: 'instagram'
    },
    {
      label: 'LinkedIn',
      value: 'linkedIn'
    },
    {
      label: 'Nabi Music Blog',
      value: 'nabi blog'
    },
    {
      label: 'Other',
      value: 'other'
    },
    {
      label: 'Pinterest',
      value: 'pinterest'
    },
    {
      label: 'Twitter',
      value: 'twitter'
    }
  ]

  export const agreeWithTerms = 'I agree with the {termsOfServiceReplace} of NabiMusic.';
  export const termsOfServicePlaceholder = '{termsOfServiceReplace}';
  export const termsText = 'Terms of Use';

}

export namespace RegistrationOptionsComponent {
  export const studentCTATitle = 'Find a Music Instructor Today!';
  export const studentCTADescription = 'Get started by posting a request.';
  export const studentButton = 'Find a Music Instructor Today';
  export const instructorCTATitle = 'Apply for Teaching Jobs';
  export const instructorCTADescription = 'Make more income through NabiMusic.';
  export const instructorButton = 'Apply for Jobs';
  export const preLaunchStudentCTATitle = 'Find a Music Instructor';
  export const preLaunchStudentCTADescription = 'Take music lessons with a qualified instructor.';
  export const preLaunchStudentButton = 'Find a Music Instructor';
  export const preLaunchInstructorCTATitle = 'Find Teaching Jobs';
}

export namespace RegistrationParentstudentOptionsComponent {
  export const description = 'Are you a student or a parent?';
  export const parent = 'I am a parent';
  export const student = 'I am a student';
  export const InstructorUrl = 'Register as an instructor';
}
