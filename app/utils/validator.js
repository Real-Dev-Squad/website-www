export const validator = (value, words, length = 1) => {
  const sanitizedVal = value.trim();
  const splittedVal = sanitizedVal.split(' ');

  if (splittedVal[0] === '') {
    return false;
  } else {
    const isValid =
      sanitizedVal.length >= length && splittedVal.length >= words;
    return isValid;
  }
};
