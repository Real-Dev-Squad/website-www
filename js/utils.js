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

function getDateDifferenceInYearsAndMonths(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    throw new Error('Start date cannot be after the end date.');
  }

  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();

  let totalMonths = yearDiff * 12 + monthDiff;

  if (end.getDate() < start.getDate()) {
    totalMonths -= 1;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months };
}
