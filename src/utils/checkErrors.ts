export const checkErrors = (array: string[]) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i]) {
      return true;
    }
  }
  return false;
};
