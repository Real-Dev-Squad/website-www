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
  element.id = id ?? isEmpty(id);
  return element;
}

/**
 * @param value:
 * @returns boolean which returns
 * - `true` if value is empty or falsy
 */
function isEmpty(valueToCheck) {
  if (typeof valueToCheck === 'undefined') {
    return true;
  }
}
