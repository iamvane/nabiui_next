import { ValidatorFactory } from '../../utils/Validator';
import { validateEmail } from '../../utils/formValidation';

let InviteFriendsValidator = new ValidatorFactory();

InviteFriendsValidator.registerField('email');

export const fields = InviteFriendsValidator.getFieldState();
InviteFriendsValidator.registerFieldValidator('email', (value: string) => {
  return !value.length
    ? 'Enter email address.'
    : '';
});

InviteFriendsValidator.registerFieldValidator('email', (value: string) => {
  const isEmail = validateEmail(value);
  return !isEmail
    ? 'Enter a valid email address.'
    : '';
});

export const validateFields = InviteFriendsValidator.validateFields;
export const validateField = InviteFriendsValidator.validateField;
