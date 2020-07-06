export namespace ValidatePhoneComponent {
  export const pageTitle = 'Validate Phone';
  export const nextButton = 'Next';
}

export namespace LessonDetailsComponent {
  export const pageTitleParent = 'Who Is Learning?';
  export const pageTitleStudent = 'Lesson Details';
  export const nextButton = 'Next';

  export enum FieldNames {
    NumberOfChildren = 'numberOfChildren',
    Email = 'email',
    Password = 'password',
    FirstName = 'firstName',
    LastName = 'lastName',
    Reference = 'reference',
    AgreeWithTerms = 'agreeWithTerms',
    OtherText = 'otherText',
    Gender = 'gender',
    PhoneNumber = 'phoneNumber'
  }
}

export namespace ChildFormComponent {
  export const instrumentChips = [
    {
      label: 'Guitar',
      value: 'guitar'
    },
    {
      label: 'Piano',
      value: 'piano'
    },
    {
      label: 'Ukulele',
      value: 'ukulele'
    },
    {
      label: 'Violin',
      value: 'violin'
    },
    {
      label: 'Singing',
      value: 'singing'
    }
  ];

  export const levelChips = [
    {
      label: 'Beginner',
      value: 'beginner'
    },
    {
      label: 'Intermediate',
      value: 'intermediate'
    },
    {
      label: 'Advanced',
      value: 'advanced'
    }
  ];

  export enum FieldNames {
    Name = 'name',
    Dob = 'dob',
    Instrument = 'instrument',
  }

  export enum FieldKey {
    Name = 'name',
    Dob = 'dob',
    Instrument = 'instrument',
    Level = 'level'
  }

  export enum Ids {
    Name = 'name',
    Dob = 'dob',
    Instrument = 'instrument',
    Level = 'level'
  }
  export enum Placeholders {
    Name = 'Name',
    Instrument = 'Other'
  }
  export enum Labels {
    Dob = 'Date of birth',
    Instrument = 'Instrument',
    Level = 'Level'
  }

  export interface ChildFormErrors {
    name?: string;
    dob?: string;
    instrument?: string;
    level?: string
  }

  export const defaultErrors: ChildFormErrors = {}

  export const childFormErrorMessages = {
    name: 'Enter student\'s name.',
    dob: 'Enter date of birth.',
    instrument: 'Select instrument.',
    level: 'Select level.'
  }
}

export namespace ScheduleTrialFormComponent {
  export const pageTitle = 'Schedule Trial';
  export const pageTitleParent = 'Schedule {studentReplace} Trial';
  export const studentPlaceholder = '{studentReplace}';

  export enum Placeholders {
    LessonDate = 'Lesson date',
    LessonTime = 'Lesson time',
    UserTimezone = 'Timezone',
  }

  export enum FieldNames {
    LessonDate = 'date',
    LessonTime = 'time',
    UserTimezone = 'timezone',
  }

  export enum FieldKey {
    LessonDate = 'date',
    LessonTime = 'time',
    UserTimezone = 'timezone',
  }

  export enum Ids {
    LessonDate = 'date',
    LessonTime = 'time',
    UserTimezone = 'timezone',
  }

  export interface FormErrors {
    [FieldKey.LessonDate]?: string;
    [FieldKey.LessonTime]?: string;
    [FieldKey.UserTimezone]?: string;
  }

  export enum ErrorMessages {
    LessonDate = 'Enter lesson date.',
    LessonTime = 'Enter lesson time.',
    UserTimezone = 'Select timezone.',
  }
}

export namespace ChooseInstructorComponent {
  export const pageTitle = 'Choose Instructor';
}

export const instructorsDummuyData = [
  {
    id: 0,
    displayName: "Frank F.",
    reviews: 5,
    experience: 3,
    age: 30,
    backgroundCheckStatus: 'VERIFIED',
    rate: 20,
    avatar:'',
    bioTitle: 'Experienced piano instructor'
  },
  {
    id: 0,
    displayName: "Bryan P.",
    reviews: 5,
    experience: 5,
    age: 27,
    backgroundCheckStatus: 'NOT_VERIFIED',
    rate: 20,
    avatar:'',
    bioTitle: 'Fun and cool instructor '
  },
  {
    id: 0,
    displayName: "Brent M.",
    reviews: 0,
    experience: 3,
    age: 28,
    backgroundCheckStatus: 'NOT_VERIFIED',
    rate: 20,
    avatar:'',
    bioTitle: 'Learn piano with the best, me!'
  }
];
