export namespace ScheduleLessonsComponent {
  export const title = 'Schedule Your Trial';
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
}
