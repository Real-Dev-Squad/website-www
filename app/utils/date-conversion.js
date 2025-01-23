export const getUTCMidnightTimestampFromDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map((str) => parseInt(str));
  const inputDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  return inputDate.getTime();
};
