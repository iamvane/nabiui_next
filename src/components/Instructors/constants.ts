export enum Gender {
  any = 'Any',
  female = 'Female',
  male = 'Male'
}

export enum SortBy {
  Any = 'Any',
  lessonRate = 'Lesson rate',
  Distance = 'Distance',
}

export interface SortByOptions {
  label: SortBy;
  value: string;
}

export const sortByOptions = [
  {
    label: SortBy.Any,
    value: ''
  },
  {
    label: SortBy.lessonRate,
    value: 'rate'
  },
  {
    label: SortBy.Distance,
    value: 'distance'
  }
];

export interface SelectOption {
  label: string;
  value: string;
}

export const ageLabels = {
  children: 'Child (12 & under)',
  teens: 'Teen (13-17)',
  adults: 'Adult (18-65)',
  seniors: 'Senior (65+)'
};

export const ageOptions: SelectOption[] = [
  {
    label: 'Any',
    value: ''
  },
  {
    label: ageLabels.children,
    value: 'children'
  },
  {
    label: ageLabels.teens,
    value: 'teens'
  },
  {
    label: ageLabels.adults,
    value: 'adults'
  },
  {
    label: ageLabels.seniors,
    value: 'seniors'
  },
];

export const genderOptions: SelectOption[] = [
  {
    label: 'Any',
    value: '',
  },
  {
    label: 'Female',
    value: 'female'
  },
  {
    label: 'Male',
    value: 'male'
  }
];

export const availabilityLabels = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
};

export const availabilityOptions: SelectOption[] = [
  {
    label: availabilityLabels.monday,
    value: 'monday'
  },
  {
    label: availabilityLabels.tuesday,
    value: 'tuesday'
  },
  {
    label: availabilityLabels.wednesday,
    value: 'wednesday'
  },
  {
    label: availabilityLabels.thursday,
    value: 'thursday'
  },
  {
    label: availabilityLabels.friday,
    value: 'friday'
  },
  {
    label: availabilityLabels.saturday,
    value: 'saturday'
  },
  {
    label: availabilityLabels.sunday,
    value: 'sunday'
  },
];

export const placeForLessonsLabels = {
  home: 'Home',
  studio: 'Studio',
  online: 'Online'
};

export const placeForLessonsOptions: SelectOption[] = [
  {
    label: placeForLessonsLabels.home,
    value: 'home'
  },
  {
    label: placeForLessonsLabels.studio,
    value: 'studio'
  },
  {
    label: placeForLessonsLabels.online,
    value: 'online'
  },
];

export const qualificationOptions: SelectOption[] = [
  {
    label: 'Certified teacher',
    value: 'certifiedTeacher'
  },
  {
    label: 'Music therapy',
    value: 'musicTherapy'
  },
  {
    label: 'Music production',
    value: 'musicProduction'
  },
  {
    label: 'Ear training',
    value: 'earTraining'
  },
  {
    label: 'Conducting',
    value: 'conducting'
  },
  {
    label: 'Virtuoso recognition',
    value: 'virtuosoRecognition'
  },
  {
    label: 'Performance',
    value: 'performance'
  },
  {
    label: 'Music theory',
    value: 'musicTheory'
  },
  {
    label: 'Experience teaching young children',
    value: 'experienceTeachingYoungChildren'
  },
  {
    label: 'Repertoire selection',
    value: 'repertoireSelection'
  },
];

export namespace InstructorsComponent {
  export const pageTitle = 'Instructors';
  export const breadcrumbLabels = {
    home: 'Home',
    requests: 'Instructors'
  }
}

export namespace InstructorCardComponent {
  export const maxBioDescriptionLength = 112;

  export enum Text {
    Age =  'Age',
    StartAt = 'Rate per lesson',
    ViewMore = '...View More',
    ViewLess = 'View Less',
    LessonRatePlaceholder = '{LessonRate}',
    LessonRate = '${LessonRate}',
    LastLogin = 'Last Login:',
    LessonsTaught = 'Lessons Taught:',
    MemberSince = 'Member Since:',
    SendMessage = 'Send Message',
    ViewProfile = 'View Profile'
  }
}

export namespace InstructorFilterComponent {
  export const title = 'Refine Your Search';
  export const rangeDefaulValue = [0, 200];

  export const rangeMinValue = 0; // Lessons Rate minimun value
  export const rangeMaxValue = 200; // Lessons Rate maximun value
  export const sliderMarks = [
    {
      value: 0,
      label: '$0',
    },
    {
      value: 200,
      label: '$200',
    },
  ];

  export enum FieldLabels {
    Sort = 'Sort',
    Distance = 'Distance',
    Location = 'Place For Lessons',
    Availability = 'Availability',
    Price = 'Price',
    Age = 'Student Age',
    Gender = 'Gender',
    Qualifications = 'Additional Qualifications'
  }

  export enum FieldNames {
    Sort = 'sort',
    Distance = 'distance',
    Location = 'placeForLessons',
    Availability = 'availability',
    Instrument = 'instrument',
    ZipCode = 'zipCode',
    Age = 'age',
    Gender = 'gender',
    Price = 'lessonRate',
    Qualifications = 'qualifications'
  }

  export enum Ids {
    Sort= 'sort',
    Distance = 'distance',
    Location = 'placeForLessons',
    Availability = 'availability',
    Age = 'age',
    Gender = 'gender',
    ZipCode = 'zipCode',
  }

  export enum Placeholders {
    Sort = 'Sort by',
    Distance = 'Any',
    Location = 'Select location',
    Availability = 'Select day(s)',
    Price = 'Select price',
    Age = 'Select age',
    Gender = 'Select gender',
    Qualifications = 'Select qualifications'
  }
}

export enum Route {
  Profile = '/profile'
}

export interface QualificationsFilterType {
  certifiedTeacher?: boolean;
  musicTherapy?: boolean;
  musicProduction?: boolean;
  earTraining?: boolean;
  conducting?: boolean;
  virtuosoRecognition?: boolean;
  performance?: boolean;
  musicTheory?: boolean;
  youngChildrenExperience?: boolean;
  repertoireSelection?: boolean;
}

export interface PlaceForLessonsFilterType {
  home?: boolean;
  studio?: boolean;
  online?: boolean;
}

export interface InstructorListQueryParams {
  sort?: string;
  instruments?: string;
  location?: string;
  distance?: number;
  placeForLessons?: string;
  availability?: string;
  age?: string;
  gender?: string;
  qualifications?: string;
  min_rate?: number;
  max_rate?: number;
}

export const defaultQueryParams: InstructorListQueryParams = {
};

export const defaultQualifications: QualificationsFilterType = {
};

export const defaultPlaceForLessons: PlaceForLessonsFilterType = {
};
