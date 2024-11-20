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

export const isoToLocalDate = (date) => {
  const dateObject = new Date(date);
  const joinDate = dateObject.getDate();
  const joinMonth = dateObject.getMonth();
  const joinYear = dateObject.getFullYear();
  const hour = dateObject.getHours();
  const min = dateObject.getMinutes();
  const sec = dateObject.getSeconds();
  const milSec = dateObject.getMilliseconds();

  return `${joinDate}/${joinMonth}/${joinYear} ${hour}:${min}:${sec}:${milSec}`;
};
