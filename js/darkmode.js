document.addEventListener('DOMContentLoaded', () => {
  if (getCookie('theme') === 'light') {
    setCookie('theme', 'light', 30);
    document.body.classList.remove('dark-theme');
  } else if (getCookie('theme') === 'dark') {
    setCookie('theme', 'dark', 30);
    document.body.classList.add('dark-theme');
  } else {
    setCookie('theme', 'light', 30);
  }
});

function setCookie(name, value, days = 30) {
  const domain = '.realdevsquad.com';
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = '; expires=' + date.toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; domain=${domain}; path=/`;
}

function getCookie(name) {
  const cookieName = name + '=';
  const splitCookie = document.cookie.split(';');
  for (let i = 0; i < splitCookie.length; i++) {
    var c = splitCookie[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(cookieName) == 0)
      return c.substring(cookieName.length, c.length);
  }
  return null;
}
