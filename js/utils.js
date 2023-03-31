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
    const status = response.status;
    const { data } = await response.json();

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
  if (!id) {
    element.id = isEmpty(id);
  } else {
    element.id = id;
  }
  return element;
}

/**
 * @param value:
 * @returns boolean which returns
 * - `true` if value is empty or falsy
 * - `false`  if value is not empty or truthy
 */
function isEmpty(valueToCheck) {
  switch (typeof valueToCheck) {
    case 'undefined':
      return true;
    case 'string':
      return valueToCheck.trim().length === 0 || valueToCheck.length === 0;
    case 'object':
      if (valueToCheck === null) {
        return true;
      } else if (Array.isArray(valueToCheck)) {
        return valueToCheck.length === 0;
      } else {
        return Object.keys(valueToCheck).length === 0;
      }
    case 'number':
      return Number.isNaN(valueToCheck);
    default:
      return false;
  }
}
