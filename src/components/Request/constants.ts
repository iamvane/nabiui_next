import { CommonConstants } from '../common/constants/common';

export namespace RequestListComponent {
  export const pageTitle = 'Requests';
}

export namespace RequestComponent {
  export const title = 'Build Request';

  /* tslint:disable-next-line */
  export const descriptionStudent = 'A request highlights the deatils of a lessons. You must create a separate request for each instrument you are interested in learning.'
  /* tslint:disable-next-line */
  export const descriptionParent = 'A request highlights the deatils of a lessons. For instance, you can have more than one child learning together the same instrument with the same instructor. You must create a separate request for each instrumnet your child (or children) wants to learn.';

  export enum ButtonText {
    Add = 'Add Request',
    AddAnother = 'Add Another Request',
  }
}

export enum LessonDuration {
  any = 'Any',
  thirtyMins = '30 mins',
  fortyFiveMins = '45 mins',
  sixtyMins = '60 mins',
  ninetyMins = '90 mins'
}

export interface LessonDurationOptions {
  label: LessonDuration;
  value: string;
}

export const lessonDurationOptions = {
  any: <LessonDurationOptions> {
    label: LessonDuration.any,
    value: 'Any',
  },
  thirtyMins: <LessonDurationOptions> {
    label: LessonDuration.thirtyMins,
    value: '30 mins',
  },
  fortyFiveMins: <LessonDurationOptions> {
    label: LessonDuration.fortyFiveMins,
    value: '45 mins',
  },
  sixtyMins: <LessonDurationOptions> {
    label: LessonDuration.sixtyMins,
    value: '60 mins',
  },
  ninetyMins: <LessonDurationOptions> {
    label: LessonDuration.ninetyMins,
    value: '90 mins',
  }
};

export enum SkillLevel {
  any = 'Any',
  beginner = 'Beginner',
  intermediate = 'Intermediate',
  advanced = 'Advanced'
}

export interface SkillLevelOptions {
  label: SkillLevel;
  value: string;
}

export const RequestCreateSuccessMessage = {
  createdRequest: 'Request Successfully Created',
  editedRequest: 'Request Successfully Edited',
  deletedRequest: 'Request Successfully Deleted'
};

export const skillLevelOptions = {
  Any: <SkillLevelOptions> {
    label: SkillLevel.any,
    value: 'any'
  },
  Beginner: <SkillLevelOptions> {
    label: SkillLevel.beginner,
    value: 'beginner'
  },
  Intermediate: <SkillLevelOptions> {
    label: SkillLevel.intermediate,
    value: 'intermediate'
  },
  Advanced: <SkillLevelOptions> {
    label: SkillLevel.advanced,
    value: 'advanced'
  }
};

export enum SortBy {
  Distance = 'Distance',
  SkillLevel = 'Skill Level'
}

export interface SortByOptions {
  label: SortBy;
  value: string;
}

export interface SortByOptionsType {
  [key: string]: any;
}

export const sortByOptions: SortByOptionsType = {
  Distance: <SortByOptions> {
    label: SortBy.Distance,
    value: 'Distance'
  },
  SkillLevel: <SortByOptions> {
    label: SortBy.SkillLevel,
    value: 'Skill Level'
  }
};

export namespace RequestsListComponent {
  export const pageTitle = 'Requests';
}

export namespace RequestFilterComponent {
  export const title = 'Refine Your Search';

  export enum FieldLabels {
    Sort = 'Sort',
    Distance = 'Distance',
    Location = 'Place For Lessons',
  }

  export enum FieldNames {
    Sort = 'sort',
    Distance = 'distance',
    Location = 'placeForLessons',
    Instrument = 'instrument',
    Age = 'age',
  }

  export enum Ids {
    Sort= 'sort',
    Distance = 'distance',
    Location = 'placeForLessons',
    Age = 'age'
  }

  export enum Placeholders {
    Sort = 'Sort by',
    Distance = 'Any',
    Location = 'Select location',
    Age = 'Select age',
  }
}

export interface RequestListQueryParams {
  sort?: string;
  instrument?: string;
  location?: string;
  distance?: number;
  placeForLessons?: string;
  age?: string;
}

export const defaultQueryParams: RequestListQueryParams = {
};

export namespace RequestFormComponent {
  export const title = 'Your Request';

  export const submitText = 'Send request';

  export const studentTitle = 'STUDENT DETAILS';

  export const addStudent = 'Add Student';

  export const requestMessageDescription = 'Add a message. What else would you like candidates to know?';

  export const studentPlaceholder = '{studentPlaceholder}';

  /* tslint:disable-next-line */
  export const studentDescription = 'You can add a single student for individial lessons, or mutiple students for group lessons.'

  export enum ButtonText {
    AddAnotherRequest = 'Add Another Request',
    AddSubmit = 'Add',
    EditSubmit = 'Save Changes',
    Cancel = 'Cancel'
  }

  export enum Labels {
    LessonDuration = 'Lesson duration',
    Instrument = 'Instrument',
    SkillLevel = 'Skill level',
    StudentSkillLevel = '{studentPlaceholder}‘s skill level',
    PlaceForLessons = 'Place for lessons',
    RequestTitle= 'Add a title (ex: Piano teacher needed)',
    RequestMessage = 'Request message'
  }

  export enum Placeholders {
    RequestMessage = 'What else would you like candidates to know?',
    StudentName= 'Student\'s name',
    StudentAge= 'Student\'s age',
    Instrument = 'Select instrument',
    SkillLevel = 'Select level',
    PlaceForLesson = 'Select place for lessons',
    LessonDuration = 'Select lessons duration'
  }

  export enum FieldNames {
    RequestTitle = 'requestTitle',
    StudentName= 'name',
    StudentAge= 'age',
    LessonDuration = 'lessonDuration',
    PlaceForLessons = 'placeForLessons',
    Instrument = 'instrument',
    SkillLevel = 'skillLevel',
    RequestMessage = 'requestMessage'
  }

  export enum Ids {
    RequestTitle = 'requestTitle',
    StudentName= 'name',
    StudentAge= 'age',
    LessonDuration = 'lessonDuration',
    PlaceForLessons = 'placeForLessons',
    Instrument = 'instrument',
    SkillLevel = 'skillLevel',
    RequestMessage = 'requestMessage'
  }
}

export namespace RequestAddedComponent {
  export const title = 'Your Requests';

  export const studentNameReplace = '{studentNamePlaceholder}';
  export const studentAgeReplace = '{studentAgePlaceholder}';
  export const studentSkillLevelReplace = '{studentSkillLevelPlaceholder}';
  /* tslint:disable-next-line */
  export const studentDetails = "- {studentNamePlaceholder}, {studentAgePlaceholder} yrs old ({studentSkillLevelPlaceholder})";

  export enum Labels {
    Instrument = 'Instrument:',
    PlaceForLessons = 'Place for lessons:',
    LessonDuration = 'Lesson duration:',
    StudentDetails = 'Student details:',
    Message = 'Message:'
  }
}

export namespace StudentAddedComponent {
  export const studentAdded = '- {instrumentReplace}, {ageReplace} yrs old ({skillLevelReplace})';
  export const instrumentPlaceholder = '{instrumentReplace}';
  export const agePlaceholder = '{ageReplace}';
  export const skillLevelPlaceholder = '{skillLevelReplace}';
}

export namespace RequestViewComponent {
  export const userPlaceholder = '{userReplace}';
  export const sendApplication = 'Send Application';
  export const sendMessageTo = 'Send message to {userReplace}';
  export const lessonDurationPlaceHolder = '{lessonDurationReplace}';
  export const lessonDuration = '{lessonDurationReplace} mins lesson';
  export const applicationDate = 'Date Applied';
  export const application = 'Application';
  export const rate = 'Rate:';
  export const message = 'Message:';
  export const ratePlaceholder = '{rateReplace}';
  export const rateTextPlaceholder = '{rateTextReplace}';
  export const applicationRate = `{rateTextReplace} ${CommonConstants.dollarSing}{rateReplace}`;

  export enum Labels {
    Request = 'Request',
    Instrument = 'Instrument:',
    LessonRate = 'Lesson Rate',
    PlaceForLesson = 'Place for lessons:',
    StudentDetais = 'Student details:',
    LessonDuration = 'Lesson duration:',
    Message = 'Message:',
  }

  export enum FieldNames {
    LessonRate = 'lessonRate',
    Message = 'message'
  }

  export enum Ids {
    LessonRate = 'lessonRate',
    Message = 'message'
  }
}

export namespace RequestCardComponent {
  export const maxRequestMessageLength = 70;

  export enum Text {
    Instrument = 'Instrument:',
    Budget= 'Budget',
    PlaceForLessons = 'Place for lessons:',
    lessonDuration = 'Lesson duration:',
    StudentDetails = 'Student details:',
    YrsOld = 'yrs old ',
    LessonBudgetPlaceholder = '{LessonRate}',
    LessonBudget = '{LessonRate}/lesson',
    SendApplication = 'Send Application',
    Applications = 'applications',
    Pass = 'Pass'
  }
}
