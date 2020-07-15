export const validateEmail = (email: string): boolean => {
  return (/^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1,64}@([a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,}){1,255}){1,320}$/).test(email);
};

export const hasEmail = (texts: string[]): boolean => {
  return texts.some((text) => {
    const strippedText = text.substring(0, text.length - 1);
    return validateEmail(strippedText);
  });
}

export const validatePhonenumber = (phoneNumber: string): boolean => {
  const phoneTests = [
    /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
    /^\d{10}$/,
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  ];
  return phoneTests.some((test) => {
    if (phoneNumber.match(test)) {
      return true;
    }
    return false;
  });
}

export const hasPhonenumber = (texts: string[]) => {
  return texts.some((text) => {
    const strippedNumber = text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
    return validatePhonenumber(strippedNumber);
  });
}
