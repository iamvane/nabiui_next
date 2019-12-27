import { ValidatorFactory } from '../../../utils/Validator';
import hasBadWords from '../../../utils/BadWords';

let ProfileStepValidator = new ValidatorFactory();

ProfileStepValidator.registerField('bioDescription');
ProfileStepValidator.registerField('bioTitle');
ProfileStepValidator.registerField('studioAddress');

export const fields = ProfileStepValidator.getFieldState();
ProfileStepValidator.registerFieldValidator('bioTitle', (value: string) => {
  return (hasBadWords(value))
    ? 'Invalid. Please remove inappropriate content.'
    : '';
});

ProfileStepValidator.registerFieldValidator('bioDescription', (value: string) => {
  return (hasBadWords(value))
    ? 'Invalid. Please remove inappropriate content.'
    : '';
});

ProfileStepValidator.registerFieldValidator('bioDescription', (value: string) => {
  return (value.length > 1000 )
    ? 'Invalid. Must contain maximum 1000 characters.'
    : '';
});

ProfileStepValidator.registerFieldValidator('studioAddress', (value: string, touched: boolean, state?: any) => {
  return (touched && state.studio && (/^\s*$/).test(value) )
    ? 'Invalid. Must contain an address.'
    : '';
});

export const validateFields = ProfileStepValidator.validateFields;
export const validateField = ProfileStepValidator.validateField;
