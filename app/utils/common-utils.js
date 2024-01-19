export const readMoreFormatter = (string, lengthToDisplay) => {
  if (!string) {
    return;
  }

  if (string.length > lengthToDisplay) {
    return string.slice(0, lengthToDisplay) + '...';
  } else {
    return string;
  }
};
