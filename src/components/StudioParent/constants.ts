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
