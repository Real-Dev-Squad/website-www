onload = onload();
const icon = document.getElementById('icon');
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
  const themeIcon = document.getElementById('icon');
  if (getCookie('theme') === 'light') {
    document.body.classList.remove('dark-theme');
    themeIcon.src = 'img/moon.png';
  } else if (getCookie('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.src = 'img/sun.png';
  }
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
