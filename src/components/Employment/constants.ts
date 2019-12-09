export namespace EmploymentComponent {
  export enum Text {
    YourEmployment = 'Your Employment',
    ListYourPastExperience = 'List your past experience, make sure it is relevant',
    AddEmployment = 'Add Employment'
  }
}

export namespace EmploymentFormComponent {
  export enum Text {
    AddButton = 'Add',
    SaveChangesButton = 'Save Changes',
    CancelButton = 'Cancel',
    From = 'From',
    To = 'To',
    Present = 'Present'
  }

  export enum FieldNames {
    Employer = 'employer',
    JobTitle = 'jobTitle',
    JobLocation = 'jobLocation',
    FromMonth = 'fromMonth',
    FromYear = 'fromYear',
    ToMonth = 'toMonth',
    ToYear = 'toYear',
    StillWorkHere = 'stillWorkHere'
  }

  export enum Ids {
    Employer = 'employer',
    JobTitle = 'jobTitle',
    JobLocation = 'jobLocation',
    FromMonth = 'fromMonth',
    FromYear = 'fromYear',
    ToMonth = 'toMonth',
    ToYear = 'toYear',
  }

  export enum Placeholders {
    Employer = 'Company/employer name',
    JobTitle = 'Job title',
    JobLocation = 'Job location (city, state, country)',
    SchoolLocation = 'School location (city, state, country)'
  }

  export enum DisabledPlaceholders {
    SelectMonth = 'Select Month',
    SelectYear = 'Select Year'
  }

  export enum Labels {
    ICurrentlyWorkHere = 'I currently work here',
  }
}

export namespace EmploymentAddedComponent {
  export const timeline = '{fromMonthReplace}, {fromYearReplace} - {toMonthReplace}, {toYearReplace}';
  export const timelinePresent = '{fromMonthReplace}, {fromYearReplace} - Present';

  export const fromMonthPlaceholder = '{fromMonthReplace}';
  export const fromYearPlaceholder = '{fromYearReplace}';

  export const toMonthPlaceholder = '{toMonthReplace}';
  export const toYearPlaceholder = '{toYearReplace}';
}
