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

export enum MissingFields {
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
  requests: [{
    id: 0,
    displayName: "",
    distance: 0,
    instrument: "",
    lessonDuration: "",
    requestTitle: "",
    requestMessage: "",
    placeForLessons: "",
    skillLevel: "",
    role: "",
    applicationsReceived: 0,
    studentDetails: [{
      name: "",
      age: 0
    }],
    avatar: "",
    location: "",
    timezone: "",
    date: "",
    time: "",
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
export const replaceStudentName = '{studentName}'
