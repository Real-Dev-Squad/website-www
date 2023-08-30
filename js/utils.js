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

const getPluralString = (count, word) => {
  return count > 1 ? `${word}s` : word;
};

function getRelativeDateString(dateDiffObj) {
  const { years, months, days } = dateDiffObj;
  if (years > 0) {
    return `${years} ${getPluralString(years, 'year')} ago`
  } else if (months > 0) {
    return `${months} ${getPluralString(months, 'month')} ago`
  } else if (days >= 1) {
    return `${days} ${getPluralString(days, 'day')} ago`
  }
  return 'within a day';
}

module.exports = {
  dateDifference,
  getRelativeDateString,
};
