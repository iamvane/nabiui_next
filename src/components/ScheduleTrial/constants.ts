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
      value: 'guitar-acoustic'
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
    Level = 'level',
    SpecialNeed = 'specialNeed',
    Notes = 'notes',
  }

  export enum Ids {
    Name = 'name',
    Dob = 'dob',
    Instrument = 'instrument',
    Level = 'level',
    SpecialNeed = 'specialNeed',
    Notes = 'notes',
  }
  export enum Placeholders {
    Name = 'Name',
    Instrument = 'Other',
    Notes = 'Add notes'
  }
  export enum Labels {
    Name = 'Child\'s name',
    Dob = 'Date of birth',
    Instrument = 'Instrument',
    Level = 'Level',
    SpecialNeeds = 'Special Educational Needs (optional)',
    Notes = 'Additional Notes (optional)'
  }

  export interface ChildFormErrors {
    name?: string;
    dob?: string;
    instrument?: string;
    level?: string;
    specialNeeds?: string;
  }

  export const defaultErrors: ChildFormErrors = {}

  export const childFormErrorMessages = {
    name: 'Enter student\'s name.',
    dob: 'Enter date of birth.',
    instrument: 'Select instrument.',
    level: 'Select level.',
    specialNeeds: 'Select special needs',
  }

  export const selectSpecialNeeds = 'Select Special Need'
}

export namespace ScheduleTrialComponent {
  export const pageTitle = 'Instructor Preferences';
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

export namespace TrialConfirmationComponent {
  export const parentMessage = '{studentName} Trial is Scheduled!';
  export const studentNamePlaceholder = '{studentName}';
  export const studentMessage = 'Your Trial is Scheduled!';
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

export const instructorAvailabilityDummyData = {
  timezone: 'Eastern Time (US & Canada)',
  days: [
    {
      name: 'mon',
      number: '06',
      availability: {
        am: {
          '8:00': true,
          '9:00': true,
          '9:30': true,
        },
        pm: {
          '2:00': true,
          '5:00': true
        }
      }
    },
    {
      name: 'tue',
      number: '07',
      availability: {
        am: {
          '8:00': true,
          '9:00': true,
          '9:30': true,
        },
        pm: {
          '2:00': true,
          '5:00': true
        }
      }
    },
    {
      name: 'wed',
      number: '08',
      availability: {
        am: {
          '8:00': true,
          '9:00': true,
          '9:30': true,
        },
        pm: {
          '2:00': true,
          '5:00': true
        }
      }
    },
    {
      name: 'thu',
      number: '09',
      availability: {
        am: {
          '8:00': true,
          '9:00': true,
          '9:30': true,
        },
        pm: {
          '2:00': true,
          '5:00': true
        }
      }
    },
    {
      name: 'fri',
      number: '10',
      availability: {
        am: {
          '8:00': true,
          '9:00': true,
          '9:30': true,
        },
        pm: {
          '2:00': true,
          '5:00': true
        }
      }
    },
    {
      name: 'sat',
      number: '11',
      availability: {
        am: {
          '8:00': true,
          '9:00': true,
          '9:30': true,
        },
        pm: {
          '2:00': true,
          '5:00': true
        }
      }
    },
    {
      name: 'sun',
      number: '12',
      availability: {
        am: {
          '8:00': true,
          '9:00': true,
          '9:30': true,
        },
        pm: {
          '2:00': true,
          '5:00': true
        }
      }
    }
  ]
};
