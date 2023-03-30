export async function makeApiCall(
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
    const res = {
      data: await response.json(),
      status: response.status,
    };
    return res;
  } catch (err) {
    throw err;
  }
}

export function createElement({ type, classList = [], id }) {
  const element = document.createElement(type);
  element.classList.add(...classList);
  element.id = id;
  return element;
}
