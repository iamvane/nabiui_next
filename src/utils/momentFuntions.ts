import moment from 'moment';

export const caculateAge = (birthday: string) => {
  return Math.abs(moment(birthday).diff(moment(), 'years'));
};
