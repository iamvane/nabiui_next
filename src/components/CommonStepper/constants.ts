export enum CommonStepperButtons {
  Back = 'Back',
  Next = 'Next',
  Continue = 'Continue',
  Finish = 'Finish',
  Exit = 'Exit'
}

export namespace ConfirmExitComponent {
  export const dialogTitle = 'You have unsaved changes';
  export const dialogMessage = 'Your changes will be lost. Are you sure you want to proceed?';
  export const decline = 'No';
  export const proceed = 'Yes'
}
