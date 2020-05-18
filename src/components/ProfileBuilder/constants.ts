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

export const rates = {
  mins30: 0,
  mins45: 0,
  mins60: 0,
  mins90: 0,
}

export const placeForLessons = {
  home: false,
  studio: false,
  online: false,
}

export const sizeAgePreferences = {
  lessonSize: {
    oneStudent: false,
    smallGroups: false,
    largeGroups: false,
  },
  ageGroup: {
    children: false,
    teens: false,
    adults: false,
    seniors: false,
  }
}

export const qualifications = {
  certifiedTeacher: false,
  musicTherapy: false,
  musicProduction: false,
  earTraining: false,
  conducting: false,
  virtuosoRecognition: false,
  performance: false,
  musicTheory: false,
  youngChildrenExperience: false,
  repertoireSelection: false,
}

export const  availability = {
  mon8to10: false,
  mon10to12: false,
  mon12to3: false,
  mon3to6: false,
  mon6to9: false,
  tue8to10: false,
  tue10to12: false,
  tue12to3: false,
  tue3to6: false,
  tue6to9: false,
  wed8to10: false,
  wed10to12: false,
  wed12to3: false,
  wed3to6: false,
  wed6to9: false,
  thu8to10: false,
  thu10to12: false,
  thu12to3: false,
  thu3to6: false,
  thu6to9: false,
  fri8to10: false,
  fri10to12: false,
  fri12to3: false,
  fri3to6: false,
  fri6to9: false,
  sat8to10: false,
  sat10to12: false,
  sat12to3: false,
  sat3to6: false,
  sat6to9: false,
  sun8to10: false,
  sun10to12: false,
  sun12to3: false,
  sun3to6: false,
  sun6to9: false
}

export const enableContinueBtn = {
  instruments: false,
  jobPreferences: false,
  rates: false,
  placeForLessons:false,
  availability: false,
  qualifications: false,
  languages: false
}
export namespace VideoProfileUploaderComponent {
  export const videoDurationError = 'Your profile video should be between 20 and 60 seconds.';
  export const invalidFile = 'Upload a video file.'
}
