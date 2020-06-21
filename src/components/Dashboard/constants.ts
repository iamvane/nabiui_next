export namespace DashboardComponent {
  export const pageTitle = '{studioName}\'s Family Studio';
  export const studioNamePlaceholder = '{studioName}';
}

export namespace InstructorDashboardComponent {
  export const pageTitle = '{studioName} Studio';
  export const studioNamePlaceholder = '{studioName}';
  export const profileStatusSectionTitle = 'Profile Status';
  export const profileStatusText = 'Profile Status:';
  export const profileStatusLabels = {
    complete: 'Complete',
    incomplete: 'Incomplete'
  };
  export const profileRecommendationsSectionTitle = 'Profile Recommendations'
  export const incompleteText = "You don’t appear in searches and can’t apply to jobs. Please complete the following:";
  export const recommendationFields = ['qualifications', 'music'];
  export const missingFieldsArray = [
    'firstName',
    'lastName',
    'displayName',
    'birthday',
    'location',
    'avatar',
    'references',
    'isPhoneVerified',
    'bioTitle',
    'bioDescription',
    'instruments',
    'languages',
    'lessonSize',
    'ageGroup',
    'rates',
    'availability',
    'employment',
    'education',
    'qualifications',
    'music',
    'video',
    'yearsOfExperience'
  ];

  export const missingFieldsDisplay = {
    firstName: {
      label: 'First Name',
      url: '/account-info'
    },
    lastName: {
      label: 'Last Name',
      url: '/account-info'
    },
    displayName: {
      label: 'First Name & Last Name',
      url: '/account-info'
    },
    location: {
      label: 'Location',
      url: '/account-info'
    },
    isPhoneVerified: {
      label: 'Phone Verification',
      url: '/account-info'
    },
    avatar: {
      label: 'Avatar image',
      url: '/profile'
    },
    bioTitle: {
      label: 'Bio Title',
      url: '/profile'
    },
    bioDescription: {
      label: 'Bio Description',
      url: '/profile'
    },
    music: {
      label: 'Music',
      url: '/profile'
    },
    yearsOfExperience: {
      label: 'Years of experience',
      url: '/profile'
    },
    video: {
      label: 'Video Profile',
      url: '/profile'
    },
    instruments: {
      label: 'Instruments',
      url: '/job-preferences'
    },
    lessonSize: {
      label: 'Lesson Size',
      url: '/job-preferences'
    },
    ageGroup: {
      label: 'Age Group',
      url: '/job-preferences'
    },
    rates: {
      label: 'Rates',
      url: '/job-preferences'
    },
    availability: {
      label: 'Availability',
      url: '/job-preferences'
    },
    qualifications: {
      label: 'Qualifications',
      url: '/job-preferences'
    },
    languages: {
      label: 'Language(s)',
      url: '/job-preferences'
    },
    education: {
      label: 'Education',
      url: '/education'
    },
    employment: {
      label: 'Employment',
      url: '/employment'
    },
    references: {
      label: 'References',
      url: '/references'
    },
  }
  export const backgroundCheckSectionTitle = 'Background Check Status';
  export const backgroundCheckStatusText = 'Background Check Status:';
  export const backgroundCheckStatusLabels = {
    verified: 'Verified',
    notVerified: 'Not Verified'
  };
  export const backgroundCheckCTA = {
    text: 'Get more jobs by adding a {textReplace}.',
    backgroundCheckText: 'background check',
    textPlaceholder: '{textReplace}',
    url: '/screening'
  }
  export const myStudentsSectionTitle = 'My Students';
  export const noStundetsText = 'You currently have no students.';
  export const lessonsRemaining = 'Lessons remaining';
  export const gradeLessonButton = 'Grade Lesson';
  export const lessonDetailLabels = {
    name: 'Name',
    age: 'Age',
    students: 'Student(s)',
    parent: 'Parent',
    instrument: 'Instrument',
    skillLevel: 'Skill level'
  }
  export const findJobsButton = 'Find Jobs';
  export const applyToJobs = 'Apply to Jobs Near You';
  export const viewAll = 'View all';
}

export namespace ParentStudentDashboardComponent {
  export const lessonsRemaining = 'Lessons remaining';
  export const buyLessonButton = 'Buy More Lessons'
  export const studentSectionTitle = 'Student Details';
  export const requestsSectionTitle = 'Requests';
  export const addRequestSectionTitle = 'Add Request';
  export const studentDetailLabels = {
    age: 'Age',
    students: 'Student(s)',
    instrument: 'Instrument',
    skillLevel: 'Skill level',
    instructor: 'Instructor',
    placeForLessons: 'Teaching location',
    lessonDuration: 'Lesson duration'
  };
  export const requestCardLabels = {
    students: 'Student(s):',
    instrument: 'Instrument:',
    skillLevel: 'Skill level:',
    placeForLessons: 'Teaching location:',
    lessonDuration: 'Lesson duration:'
  };
  export const addRequestText = {
    withBookingDescription: 'Request another music instructor.',
    withoutBookingDescription: 'Get started by requesting a music instructor.',
    button: 'Request Instructor'
  }
  export const viewApplication = 'View {textReplace} Application';
  export const viewApplications = 'View {textReplace} Applications';
  export const textPlaceholder = '{textReplace}';
}

export namespace StudentCardComponent {
  export const studentLabel = 'Student';
  export const ageLabel = 'Age';
  export const instrumentLabel = 'Instrument';
  export const skillLevelLabel = 'Skill level';

  export const lessonsPlaceholder = '{lessonsReplace}';
  export const lessonsRemainingButton = '{lessonsReplace} Lessons Remaining';
  export const gradeButton = 'Grade Lesson';
  export const contactStudentButton = 'Contact Student';
}

export namespace BuyMoreLessonsModalComponent {
  export enum FieldKey {
    LessonRate = 'lessonRate',
    LessonDuration = 'lessonDuration',
  }

  export const fieldNames = {
    [FieldKey.LessonRate]: 'lessonRate',
    [FieldKey.LessonDuration]: 'lessonDuration',
  };

  export const fieldLabels = {
    [FieldKey.LessonRate]: 'Lesson rate',
    [FieldKey.LessonDuration]: 'Lesson duration',
  };

  export const placeholders = {
    [FieldKey.LessonRate]: '0.00',
    [FieldKey.LessonDuration]: 'Select lesson duration',
  };

  export const ids = {
    [FieldKey.LessonRate]: 'lessonRate',
    [FieldKey.LessonDuration]: 'lessonDuration',
  };

  export interface BuyMoreLessonsErrors {
    [FieldKey.LessonRate]?: string;
  }

  export const errorMessages: BuyMoreLessonsErrors = {
    [FieldKey.LessonRate]: 'Enter an amount.',
  };

  export const title = 'Send Reminder';
  export const displayNamePlaceholder = '{displayNameReplace}';
  export const instrumentPlaceholder = '{instrumentReplace}';
  /* tslint:disable-next-line:max-line-length */
  export const description = 'Send {displayNameReplace} a reminder to buy more {instrumentReplace} lessons at this rate per lesson';
  export const amountPlaceholder = '{amountReplace}';
  export const youGet = 'You get ${amountReplace}';
  export const cancelButton = 'Cancel';
  export const sendButton = 'Send';
}

export namespace PreLaunchInstructorDashboardComponent {
  export const profileSectionTitle = 'View Profile';
  export const percentPlaceholder = '{percentReplace}';
  export const completionText = '{percentReplace}% completed';
  export const editProfileLink = 'Edit your profile';
  export const viewProfileLink = 'View your profile';
  export const viewJobsLink = 'View available jobs';
}

export namespace PreLaunchStudentDashboardComponent {
  export enum Labels {
    Instrument = 'Instrument',
    SkillLevel = 'Skill level',
    Name = 'Name',
    Age= 'Age',
    LessonDuration = 'Lesson duration',
    LessonPlace = 'Place for lessons',
  }
}

export namespace StudentCardFormComponent {
  export enum Labels {
    Instrument = 'Instrument',
    SkillLevel = 'Skill level',
    Name = 'Name',
    Age= 'Age',
    LessonDuration = 'Lesson duration',
    LessonPlace = 'Place for lessons',
  }

  export enum Placeholders {
    StudentName = 'Student\'s name',
    StudentAge = 'Student\'s age',
    Instrument = 'Select instrument',
    SkillLevel = 'Select level',
    LessonPlace = 'Select place for lessons',
    LessonDuration = 'Select lessons duration'
  }

  export enum FieldKey {
    StudentName = 'name',
    StudentAge = 'age',
    Instrument = 'instrument',
    SkillLevel = 'skillLevel',
    Distance = 'miles',
    LessonPlace = 'lessonPlace',
    LessonDuration = 'lessonDuration',
  }

  export const FieldNames = {
    [FieldKey.StudentName]: 'name',
    [FieldKey.StudentAge]: 'age',
    [FieldKey.Instrument]: 'instrument',
    [FieldKey.SkillLevel]: 'skillLevel',
    [FieldKey.LessonPlace]: 'lessonPlace',
    [FieldKey.LessonDuration]: 'lessonDuration',
  };

  export enum Ids {
    StudentName = 'name',
    StudentAge = 'age',
    Instrument = 'instrument',
    SkillLevel = 'skillLevel',
    LessonPlace = 'lessonPlace',
    LessonDuration = 'lessonDuration',
  }

  export enum ButtonText {
    AddSubmit = 'Add',
    EditSubmit = 'Save Changes',
    Cancel = 'Cancel'
  }
}
