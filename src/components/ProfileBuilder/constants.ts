export namespace ProfileBuilderComponent {
  export const pageTitle = 'Build Profile';
}

export namespace ProfileBuilderStepper {
  export enum StepsLabels {
    AccountInfo = 'Account Info',
    Profile = 'Profile',
    JobPreferences = 'Job Preferences',
    Education = 'Education',
    Employment = 'Employment',
    References = 'References',
    Screening = 'Screening'
  }

  export enum StepsPaths {
    AccountInfo = '/account-info',
    Profile = '/profile',
    JobPreferences = '/job-preferences',
    Education = '/education',
    Employment = '/employment',
    References = '/references',
    Screening = '/screening',
  }

  export const stepsQueries = [
    'account-info',
    'profile',
    'job-preferences',
    'education',
    'employment',
    'references',
    'screening'
  ];

  export const steps = {
    accountInfo: {
      label: StepsLabels.AccountInfo,
      url: StepsPaths.AccountInfo,
    },
    profile: {
      label: StepsLabels.Profile,
      url: StepsPaths.Profile,
    },
    jobPreferences: {
      label: StepsLabels.JobPreferences,
      url: StepsPaths.JobPreferences,
    },
    education: {
      label: StepsLabels.Education,
      url: StepsPaths.Education,
    },
    employment: {
      label: StepsLabels.Employment,
      url: StepsPaths.Employment,
    },
    references: {
      label: StepsLabels.References,
      url: StepsPaths.References,
    },
    screening: {
      label: StepsLabels.Screening,
      url: StepsPaths.Screening,
    },
  };
}

export namespace ScreeningComponent {
  /* tslint:disable-next-line */
  export const screening = 'The safety of our community is important to all of us. That’s why we run an initial background screening on instructors as part of enrollment.';
  /* tslint:disable-next-line */
  export const disclosure = 'In connection with your enrollment in NabiMusic.com, we may order a background check on you from one or more thrid party consumer reporting agencies to help assess your eligibility for NabiMusic.com membership, which may be considered for employment purposes under the Fair Credit Reporting Act. If you continue to use the service, we may order additional background checks on you or view those you authorize for the same purpose. Such background screenings or checks may contain publicly available information concerning your criminal history, driving records, address history, online activity or references to you, and/or social security verification.';
  export const backgroundCheckLabel = 'By clicking this box, I acknowledge that I have read, understand and agree to this disclosure, and I authorize NabiMusic.com to obtain and view one or more background checks as described above';

  export const continueButton = 'Continue';
  export const exitEnrollmentButton = 'Exit Enrollment';

  export const fieldName = 'isCompliant';
}

export enum BackgroundCheckStatus {
  verified = 'VERIFIED',
  pending = 'PENDING',
  warning = 'WARNING',
  notVerified = 'NOT_VERIFIED'
}
