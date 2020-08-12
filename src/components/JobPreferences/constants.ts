export enum JobPreferences {
  oneStudent = 'One student',
  smallGroups = 'Small groups (2-4)',
  largeGroups = 'Large groups (+5)',
  children = 'Children (4 to 12 years old)',
  teens = 'Teens (13 to 19 years old)',
  adults = 'Adults (20 to 49 years old)',
  seniors = 'Seniors (50+)'
}

export interface JobPreferencesOptions {
  label: JobPreferences;
  name: string;
}

export const JobPreferencesOptions = {
  Children: <JobPreferencesOptions> {
    label: JobPreferences.children,
    name: 'children'
  },
  Teens: <JobPreferencesOptions> {
    label: JobPreferences.teens,
    name: 'teens'
  },
  Adults: <JobPreferencesOptions> {
    label: JobPreferences.adults,
    name: 'adults'
  },
  Seniors: <JobPreferencesOptions> {
    label: JobPreferences.seniors,
    name: 'seniors'
  },
};

export namespace JobPreferencesComponent {
  export enum Text {
    StudentAge = 'Student Age',
    SpecifyWhatAge = 'Specify what age group you are comfortable working with (select all that apply)',
    SpecifyHowMany = 'Specify how many students you are comfortable teaching at the same time (select all that apply)'
  }
}
