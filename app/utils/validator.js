export const validator = (value, words) => {
  const sanitizedVal = value.trim();
  const splittedVal = sanitizedVal.split(' ');

  let isValid;
  let remainingWords = 0;

  if (splittedVal[0] === '') {
    isValid = false;
  } else {
    isValid = sanitizedVal.length >= 1 && splittedVal.length >= words;
  }

  if (!isValid) {
    remainingWords = words - splittedVal.length;
  }

  return {
    isValid: isValid,
    remainingWords: remainingWords,
  };
};
