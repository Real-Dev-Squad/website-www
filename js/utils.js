async function makeApiCall(
  url,
  method = 'get',
  body = null,
  credentials = 'include',
  headers = { 'content-type': 'application/json' },
  options = null,
) {
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
      credentials,
      ...options,
    });
    const data = await response.json();
    const status = response.status;
    const res = {
      data,
      status,
    };
    return res;
  } catch (err) {
    throw err;
  }
}

function createElement({ type, classList = [], id }) {
  const element = document.createElement(type);
  element.classList.add(...classList);
  element.id = id ?? true;
  return element;
}

function joinDate(date) {
  const dateObject = new Date(date);
  const joinDate = dateObject.getDate();
  const joinMonth = dateObject.getMonth();
  const joinYear = dateObject.getFullYear();
  const hour = dateObject.getHours();
  const min = dateObject.getMinutes();
  const sec = dateObject.getSeconds();
  const milSec = dateObject.getMilliseconds();
  const timezone = dateObject.toString().slice(25);

  return `${joinDate}/${joinMonth}/${joinYear} ${hour}:${min}:${sec}:${milSec} ${timezone}`;
}

function dateDifference(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (start > end) {
    [start, end] = [end, start];
  }

  let yearDiff = end.getFullYear() - start.getFullYear();
  let monthDiff = end.getMonth() - start.getMonth();
  let dayDiff = end.getDate() - start.getDate();

  if (dayDiff < 0) {
    monthDiff--;
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    dayDiff = lastMonth.getDate() + dayDiff;
  }

  if (monthDiff < 0) {
    yearDiff--;
    monthDiff = 12 + monthDiff;
  }

  return {
    years: yearDiff,
    months: monthDiff,
    days: dayDiff,
  };
}

module.exports = {
  dateDifference,
};
