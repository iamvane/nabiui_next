export namespace RequestBuilderComponent {
    export const pageTitle = 'Build Request';
  }

export namespace RequestBuilderStepper {
  export enum StepsLabels {
    AccountInfo = 'Account Info',
    BuildRequest = 'Request'
  }

  export const stepsQueries = [
    'account-info',
    'request'
  ];

  export enum StepsPaths {
    AccountInfo = '/account-info',
    BuildRequest = '/request'
  }

  export const steps = {
    accountInfo: {
      label: StepsLabels.AccountInfo,
      url: StepsPaths.AccountInfo,
    },
    buildRequest: {
      label: StepsLabels.BuildRequest,
      url: StepsPaths.BuildRequest,
    }
  };
}

export namespace SendRequestComponent {
  /* tslint:disable-next-line */
  export const description = 'Once you click the "{sendRequestReplace}" button, your request will go live and you should start receiving applications from candidates within 24 hours.';

  export const sendRequestPlaceholder = '{sendRequestReplace}';

  export const yourRequest = 'Your Request';
  export const yourRequests = 'Your Requests';

  export const editRequest = 'Edit or add requests';

  export const sendRequestButton = 'Send Request';
  export const sendRequestsButton = 'Send Requests';
}

export namespace PreLaunchStudentDetailsComponent {
  export const sectionTitle = 'Student Details';
  export const numberOfChildrenText = 'How many children want to learn a musical instrument?';
  export const placeholder = 'Number of children';
  export const numberPlaceholder = '{numberReplace}';
  export const childSectionTitle = 'Child {numberReplace} Details';

  export const buttonText = 'Continue';
  export const addChildButton = 'Add Child';
  export const removeChildButton = 'Remove Child';
}

export namespace ValidatePhoneComponent {
  export const pageTitle = 'Validate Phone';
  export const nextButton = 'Next';
}

export namespace LessonDetailsComponent {
  export const pageTitle = 'Lesson Details';
  export const nextButton = 'Next';

  export enum FieldNames {
    NumberOfChildren = 'numberOfChildren',
    Email = 'email',
    Password = 'password',
    FirstName = 'firstName',
    LastName = 'lastName',
    Reference = 'reference',
    AgreeWithTerms = 'agreeWithTerms',
    OtherText = 'otherText',
    Gender = 'gender',
    PhoneNumber = 'phoneNumber'
  }
}