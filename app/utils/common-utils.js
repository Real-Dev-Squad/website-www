export const readMoreFormatter = (string, lengthToDisplay) => {
  if (!string) {
    return string;
  }

  if (string.length > lengthToDisplay) {
    return string.slice(0, lengthToDisplay) + '...';
  } else {
    return string;
  }
};
