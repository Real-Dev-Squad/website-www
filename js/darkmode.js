const icon = document.getElementById('icon');
onload = onload();
icon.onclick = function () {
  const element = document.body;
  element.classList.toggle('dark-theme');
  if (element.classList.contains('dark-theme')) {
    icon.src = 'img/sun.png';
    setCookie('theme', 'dark', 30);
  } else {
    icon.src = 'img/moon.png';
    setCookie('theme', 'light', 30);
  }
};

function onload() {
  if (getCookie('theme') === 'light') {
    document.body.classList.remove('dark-theme');
    icon.src = 'img/moon.png';
  } else {
    document.body.classList.add('dark-theme');
    icon.src = 'img/sun.png';
  }
}

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
