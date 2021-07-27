import { Routes } from "../common/constants/Routes";

export namespace ParentStudioComponent {
  export const pageTitleParent = '{nameReplace}\'s Family Studio';
  export const pageTitleStudent = '{nameReplace}\'s Studio';
  export const namePlaceholder = '{nameReplace}';

  export const pageTitleParentNoName = 'Family Studio';
  export const pageTitleStudentNoName = 'Studio';

  export const nextLesson = 'Next Lesson: {dateReplace} @ {timeReplace} ({timezoneReplace}) with {instructorRepalce}';
  export const unassignedInstructor = 'Unassigned Instructor'
  export const datePlaceholder = '{dateReplace}';
  export const timePlaceholder = '{timeReplace}';
  export const timezonePlaceholder = '{timezoneReplace}';
  export const instructorPlaceholder = '{instructorRepalce}';
  export const noNextLesson = 'No upcoming lessons';
  export const studentDescription = '{nameReplace}\'s {instrumentReplace} Lessons'
  export const instrumentPlaceholder = '{instrumentReplace}';
  export const buyMoreLessonsButton = 'Buy More Lessons';
  export const reschedule = 'Reschedule';
  export const noActions = 'No Actions';

  export const noStudentsDescription = 'Bring Inspiration To Your Family';
  export const scheduleTrialButton = 'Schedule Trial';

  export const noLessons = 'No lessons';
  export const unassigned = 'Unassigned';

  export const ungraded = 'No grade';
  export const clickToJoinLesson = 'Click here to join lesson';
  export const nextLessonTooltipTitle = 'You can join 10 mins before the lesson starts.';
}

export enum LessonStatuses {
  scheduled = 'scheduled',
  missed = 'missed',
  complete = 'complete'
}

export enum LessonStatusLabels {
  scheduled = 'Scheduled',
  missed = 'Missed',
  complete = 'Complete',
  pending = 'Pending'
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

export namespace MissingFieldsComponent {
  export const ActionRequired = 'Action Required';
  export const replaceStudentName = '{studentName}';
  export const replaceInstructorName = '{instructorName}';
  export const replaceUrl = '{urlText}';
  export const replaceInstructorId = ':instructorId';
}

export const menuItems = [
  {
    label: 'Studio',
    route: Routes.ParentStudio
  },
  {
    label: 'Inbox',
    route: Routes.Inbox
  },
  {
    label: 'Feed',
    route: Routes.Feed
  },
  {
    label: 'Help',
    route: Routes.ContactUs
  }
];

// export const headerMenuItems = [
//   {
//     label: 'Login',
//     route: Routes.Login
//   }
// ];