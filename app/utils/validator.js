export const validator = (value, words) => {
  const sanitizedVal = value.trim();
  const splittedVal = sanitizedVal.split(' ').filter((word) => word !== '');

  // Check if the word count matches the exact limit
  const isValid = splittedVal.length < words;

  // Calculate remainingWords irrespective of the isValid value
  const remainingWords = words - splittedVal.length;

  return {
    isValid: !isValid,
    remainingWords: remainingWords,
  };
};
