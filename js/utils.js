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
