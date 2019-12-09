export namespace DashboardComponent {
  export const pageTitle = 'Dashboard';
}

export namespace InstructorDashboardComponent {
  export const myStudents = 'My Students';
  export const noStundets = 'You currently have no students';
  export const findJobsButton = 'Find Jobs';
  export const applyToJobs = 'Apply to Jobs Near You';
  export const viewAll = 'View all';
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
  export const profileCompletionSectionTitle = 'Profile Completion';
  export const profileSectionTitle = 'View Profile';
  export const descriptionText = 'Your profile is';
  export const percentPlaceholder = '{percentReplace}';
  export const completionText = '{percentReplace}% completed';
  export const editProfileLink = 'Edit your profile';
  export const viewProfileLink = 'View your profile';
  export const viewJobsLink = 'View available jobs';
}

export namespace PreLaunchStudentDashboardComponent {
  export const studentSectionTitle = 'Student Details';
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
