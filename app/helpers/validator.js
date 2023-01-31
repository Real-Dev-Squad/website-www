export const validator = (value, length) => {
  const isValid = value.trim().split(' ').length >= length;
  return isValid;
};
