import { Routes } from "../common/constants/Routes";

export const pageTitle = 'Grade Lesson';
export const studentNameSection = 'Student\'s name';
export const instrumentSection = 'Instrument';
export const dateOfLessonSection = 'Date of Lesson';
export const gradeSection = 'Grade';
export const missedLesson = 'Missed Lesson';
export const commentsSection = 'Lesson Comments';
export const button = 'Submit Grade';
export const missedLessonDescription = 'If this is a no-show, check this box';

export enum FieldNames {
  Date = 'date',
  Grade = 'grade',
  Status = 'status',
  Comment = 'comment'
}

export enum Ids {
  Date = 'date',
  Grade = 'grade',
  Status = 'status',
  Comment = 'comment'
}

export const menuItems = [
  {
    label: 'Studio',
    route: Routes.InstructorStudio
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