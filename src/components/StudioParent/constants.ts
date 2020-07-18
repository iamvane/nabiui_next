export namespace ParentStudioComponent {
  export const pageTitleParent = '{nameReplace}\'s Family Studio';
  export const pageTitlrStudent = '{nameReplace} Studio';
  export const namePlaceholder = '{nameReplace}';

  export const nextLesson = 'Next Lesson: {dateReplace} @ {timeReplace} with {instructorRepalce}.';
  export const datePlaceholder = '{dateReplace}';
  export const timePlaceholder = '{timeReplace}';
  export const instructorPlaceholder = '{instructorRepalce}';
  export const noNextLesson = 'No upcoming lessons';
  export const studentDescription = '{nameReplace} {instrumentReplace} Lessons'
  export const instrumentPlaceholder = '{instrumentReplace}';
  export const buyMoreLessonsButton = 'Buy More Lessons';
  export const reschedule = 'Reschedule';
  export const noActions = 'No Actions';
}

export enum LessonStatuses {
  scheduled = 'scheduled',
  missed = 'missed',
  complete = 'complete'
}

export enum LessonStatusLabels {
  scheduled = 'Scheduled',
  missed = 'Missed',
  complete = 'Complete'
}
