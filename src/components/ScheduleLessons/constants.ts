export namespace ScheduleLessonsComponent {
  export const pageTitle = 'Schedule Lesson';
  export const pageTitleParent = 'Schedule {studentReplace}\' Lesson';
  export const studentPlaceholder = '{studentReplace}';

  export const description = 'Set the date and time for your next lesson.'
  export const scheduleLessonButton = 'Schedule Lesson';
  export const goToDashboardButton = "Go To Dashboard";

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

  export enum WeekdaysLabels {
    Monday = 'Mon',
    Tuesday = 'Tue',
    Wendesday = 'Wed',
    Thursday = 'Thu',
    Friday = 'Fri',
    Saturday = 'Sat',
    Sunday = 'Sun'
  }

  export const weekdaysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  export const amScheduleChips = [
    {
      label: '7:00-7:30',
      value: '7:00'
    },
    {
      label: '7:30-8:00',
      value: '7:30'
    },
    {
      label: '8:00-8:30',
      value: '8:00'
    },
    {
      label: '8:30-9:00',
      value: '8:30'
    },
    {
      label: '9:00-9:30',
      value: '9:00'
    },
    {
      label: '9:30-10:00',
      value: '9:30'
    },
    {
      label: '10:00-10:30',
      value: '10:00'
    },
    {
      label: '10:30-11:00',
      value: '10:30'
    },
    {
      label: '11:00-11:30',
      value: '11:00'
    },
    {
      label: '11:30-12:00',
      value: '11:30'
    }
  ];

  export const pmScheduleChips = [
    {
      label: '12:00-12:30',
      value: '12:00'
    },
    {
      label: '12:30-1:00',
      value: '12:30'
    },
    {
      label: '1:00-1:30',
      value: '13:00'
    },
    {
      label: '1:30-2:00',
      value: '13:30'
    },
    {
      label: '2:00-2:30',
      value: '14:00'
    },
    {
      label: '2:30-3:00',
      value: '14:30'
    },
    {
      label: '3:00-3:30',
      value: '15:00'
    },
    {
      label: '3:30-4:00',
      value: '15:30'
    },
    {
      label: '4:00-4:30',
      value: '16:00'
    },
    {
      label: '4:30-5:00',
      value: '16:30'
    },
    {
      label: '5:00-5:30',
      value: '17:00'
    },
    {
      label: '5:30-6:00',
      value: '17:30'
    },
    {
      label: '6:00-6:30',
      value: '18:00'
    },
    {
      label: '6:30-7:00',
      value: '18:30'
    },
    {
      label: '7:00-7:30',
      value: '19:00'
    },
    {
      label: '7:30-8:00',
      value: '19:30'
    },
    {
      label: '8:00-8:30',
      value: '20:00'
    },
    {
      label: '8:30-9:00',
      value: '20:30'
    },
  ];
}

export namespace BookingDetailsComponent {
  export const pageTitle = 'Booking Details';
  export const date = '{dateRepalce} @ {timeReplace}';
  export const datePlaceholder = '{dateRepalce}';
  export const timePlaceholder = '{timeReplace}';
  export const parentMessage = '{studentName}\' Lesson is Scheduled';
  export const studentNamePlaceholder = '{studentName}';
  export const studentMessage = 'Your Lesson is Scheduled';
  export const lessonDuration = '30 mins';
  export const instructorDetails = 'Instructor details provided upon confirmation.'
  export const addChildButton = 'Add Another Child';
  export const continueButton = 'Continue';
}
