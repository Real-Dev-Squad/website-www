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

// export const questionValidator = (question) => {
//   const MIN_QUESTION_LENGTH = 5;
//   if (!question) return { isValid: false, message: 'Please add valid question' };

//   const trimmedQuestion = question.trim();

//   if (!trimmedQuestion) return false;

//   if (trimmedQuestion.length < MIN_QUESTION_LENGTH) return false;

// }
