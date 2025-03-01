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

  try {
    return await fetch(url, options);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
