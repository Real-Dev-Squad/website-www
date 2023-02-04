export const validator = (value, words) => {
  const sanitizedVal = value.trim();
  const splittedVal = sanitizedVal.split(' ');

  if (splittedVal[0] === '') {
    return false;
  } else {
    //checking if string is not empty and words is greater/equal to the required words
    const isValid = sanitizedVal.length >= 1 && splittedVal.length >= words;
    return isValid;
  }
};
