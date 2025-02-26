export default async function apiRequest(
  url,
  method = 'GET',
  body = null,
  customHeaders = {},
) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return await fetch(url, options);
}
