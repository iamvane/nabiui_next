export enum LessonDuration {
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

export namespace RatesComponent {
  export enum Text {
    RatesForLessons = 'Rates for lessons',
    SpecifyYourPreferred = 'Specify your preferred hourly rate'
  }
  export const instructorGain = 'You get ${gainReplace}';
  export const gainPlaceholder = '{gainReplace}';
  export const ratesList = '- {minutesReplace}';
  export const minutesPlaceholder = '{minutesReplace}';
}
