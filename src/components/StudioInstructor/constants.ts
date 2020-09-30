import {
  InstructorDashboardType,
} from '../Dashboard/models';

export namespace InstructorStudioComponent {
  export const pageTitle = '{nameReplace}\'s Studio';
  export const namePlaceholder = '{nameReplace}';
  export const pageTitleNoName = 'Studio';
  export const nextLesson = 'Next Lesson: {dateReplace} @ {timeReplace} ({timezoneReplace}) with {nameReplace}';
  export const timezonePlaceholder = '{timezoneReplace}';
  export const datePlaceholder = '{dateReplace}';
  export const timePlaceholder = '{timeReplace}';
  export const noNextLesson = 'No upcoming lessons';
  export const noStudents = 'You currently have no students. Nabi Music matches you with students based on specific criteria such as the instrument(s) you teach, your availability and rate. Please make sure your profile is always up to date.';
  export const updateProfileButton = 'Update Profile';
  export const clickToJoinLesson = 'Click here to join lesson';
  export const nextLessonTooltipTitle = 'You can join 10mins before lesson starts';
}

export namespace LessonCardComponent {
  export const lessonsRemaining = 'Lessons remaining';
  export const gradeLessonButton = 'Grade Lesson';
  export const profileSectionTitle = 'View Profile';
  export const percentPlaceholder = '{percentReplace}';
  export const completionText = '{percentReplace}% completed';
  export const editProfileLink = 'Edit your profile';
  export const viewProfileLink = 'View your profile';
  export const viewJobsLink = 'View available jobs';

  export const avatarInstrumentImages = [
    {
      instrument: 'piano',
      image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/default-piano.jpg'
    },
    {
      instrument: 'guitar',
      image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/default-guitar.jpg'
    },
    {
      instrument: 'guitar-acoustic',
      image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/default-guitar.jpg'
    },
    {
      instrument: 'guitar-classical',
      image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/default-guitar.jpg'
    },
    {
      instrument: 'singing',
      image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/default-singing.jpg'
    },
    {
      instrument: 'ukulele',
      image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/default-ukulele.jpg'
    },
    {
      instrument: 'violin',
      image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/default-violin.jpg'
    },
    {
      instrument: 'general',
      image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/general-default.jpg'
    }
  ];
}

export enum MissingFieldsConstants {
  Location = 'location',
  Avatar = 'avatar',
  Video = 'video',
  References = 'references',
  IsPhoneVerified = 'isPhoneVerified',
  BioTitle = 'bioTitle',
  BioDescription = 'bioDescription',
  Employment = 'employment',
  Education = 'education',
  Music = 'music',
  YearsOfExperience = 'yearsOfExperience',
  ZoomLink = 'zoomLink'
}

export enum ZoomMissingLinkDialog {
  Title = 'missing zoom link',
  Content = 'You must setup your Zoom Personal Meeting ID to find students',
  Cancel = 'Cancel',
  Continue = 'Continue'
}

export enum ZoomMissingLinkSetup {
  Title = 'ZOOM LINK SETUP',
  ZoomId = 'Add Zoom Personal Meeting ID',
  Cancel = 'Cancel',
  Save = 'Save',
  AlreadyHaveZoomAccount = 'If you already have a Zoom account, login to your Zoom account and go over step 2 and 3.',
  HowToGetZoomLink = 'HOW TO GET MY ZOOM LINK',
  SignupZoom = '{number} {textReplace} for a Zoom Account.',
  SignupUrl = 'https://zoom.us/signup',
  PastePersonalId = '{number} Paste your {textReplace} on the field above and save.',
  GoToZoomProfile = '{number} Go to {firstBoldText} and copy your {secondBoldText}',
  zoomLinkInputName = 'zoomLink'
}

export const textReplace = '{textReplace}';
export const firstBoldText = '{firstBoldText}';
export const secondBoldText = '{secondBoldText}';
export const number = '{number}';
export const initialInstructorDashboard = {
  id: 0,
  complete: false,
  missingFields: [],
  backgroundCheckStatus: "",
  lessons: [{
    bookingId: 0,
    instrument: "",
    skillLevel: "",
    lessonsRemaining: 0,
    lastLessonId: 0
  }],
  nextLesson: {
    id: 0,
    date: "",
    time: "",
    timezone: "",
    studentDetails: {
      name: "",
      age: 0
    },
    instructor: ""
  }
} as InstructorDashboardType;


export enum RateInstructorComponent {
  PageTitle = 'Rate your instructor',
  PageTitleWithInstructorName = 'Rate {instructorName}',
  Title = 'How was your trial lesson?',
  TitleWithStudentName = 'How was {studentName}\'s trial lesson',
  RatingHeader = 'Rating',
  RatingDescription = 'Specify the grade',
  Comment = 'Comment',
  SubmitReview = 'Submit Review',
  ReviewPlaceholder = 'Share your experience: how was the instructor and the lesson? Did you or your child enjoy it?'
}

export const replaceInstructorName = '{instructorName}';
export const replaceStudentName = '{studentName}';

export namespace MissingFieldsComponent {
  export const ActionRequired = 'Action Required';
  export const replaceStudentName = '{studentName}';
  export const replaceInstructorName = '{instructorName}';
  export const replaceUrl = '{urlText}';
  export const replaceInstructorId = ':instructorId';
}

export const missingFieldsDisplay = {
  reviews: {
    label: '- You have not left a review for {studentName}\'s instructor {instructorName} {urlText}',
    url: '/rate-instructor/:instructorId',
    urlText: 'Leave review'
  },
  firstName: {
    label: 'You have not added First Name. {urlText}',
    url: '/account-info',
    urlText: 'Add first name'
  },
  lastName: {
    label: 'You have not added Last Name. {urlText}',
    url: '/account-info',
    urlText: 'Add last name'
  },
  displayName: {
    label: 'You have not added First Name & Last Name. {urlText}',
    url: '/account-info',
    urlText: 'Add first name and last name'
  },
  location: {
    label: 'You have not added Location. {urlText}',
    url: '/account-info',
    urlText: 'Add location'
  },
  isPhoneVerified: {
    label: 'You have not added Phone Verification. {urlText}',
    url: '/account-info',
    urlText: 'Verify phone'
  },
  avatar: {
    label: 'You have not added Avatar image. {urlText}',
    url: '/profile',
    urlText: 'Add avatar'
  },
  bioTitle: {
    label: 'You have not added Bio Title. {urlText}',
    url: '/profile',
    urlText: 'Add bio title'
  },
  bioDescription: {
    label: 'You have not added Bio Description. {urlText}',
    url: '/profile',
    urlText: 'Add bio description'
  },
  music: {
    label: 'You have not added Music. {urlText}',
    url: '/profile',
    urlText: 'Add music'
  },
  yearsOfExperience: {
    label: 'You have not added Years of experience. {urlText}',
    url: '/profile',
    urlText: 'Add years of experience'
  },
  video: {
    label: 'You have not added Video Profile. {urlText}',
    url: '/profile',
    urlText: 'Add video profile'
  },
  instruments: {
    label: 'You have not added Instruments. {urlText}',
    url: '/job-preferences',
    urlText: 'Add instruments'
  },
  lessonSize: {
    label: 'You have not added Lesson Size. {urlText}',
    url: '/job-preferences',
    urlText: 'Add lesson size'
  },
  ageGroup: {
    label: 'You have not added Age Group. {urlText}',
    url: '/job-preferences',
    urlText: 'Add age group'
  },
  rates: {
    label: 'You have not added Rates. {urlText}',
    url: '/job-preferences',
    urlText: 'Add rates'
  },
  availability: {
    label: 'You have not added Availability. {urlText}',
    url: '/job-preferences',
    urlText: 'Add availability'
  },
  qualifications: {
    label: 'You have not added Qualifications. {urlText}',
    url: '/job-preferences',
    urlText: 'Add qualifications'
  },
  languages: {
    label: 'You have not added Language(s). {urlText}',
    url: '/job-preferences',
    urlText: 'Add languages'
  },
  education: {
    label: 'You have not added Education. {urlText}',
    url: '/education',
    urlText: 'Add education'
  },
  employment: {
    label: 'You have not added Employment. {urlText}',
    url: '/employment',
    urlText: 'Add employment'
  },
  references: {
    label: 'You have not added References. {urlText}',
    url: '/references',
    urlText: 'Add references'
  },
}

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
  'yearsOfExperience',
  'reviews'
];
