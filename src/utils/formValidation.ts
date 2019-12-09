export const validateNames = (str: string): boolean => {
  return !(/^[a-z ,.'-]+$/i.test(str));
};

export const validateEmail = (email: string): boolean => {
  return (/^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1,64}@([a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,}){1,255}){1,320}$/).test(email) ||
  (/^\s*$/).test(email);
};

export const validatePassword = (password: string): boolean => {
  return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W\-_]{5,}$/).test(password) || (/^\s*$/).test(password);
};
