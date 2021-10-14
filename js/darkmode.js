var icon = document.getElementById('icon');
icon.onclick = function () {
  const wasDarkmode = localStorage.getItem('darkmode') === 'true';
  localStorage.setItem('darkmode', !wasDarkmode);
  const element = document.body;
  element.classList.toggle('dark-theme', !wasDarkmode);
  if (document.body.classList.contains('dark-theme')) {
    icon.src = 'img/sun.png';
  } else {
    icon.src = 'img/moon.png';
  }
};

function onload() {
  document.body.classList.toggle(
    'dark-theme',
    localStorage.getItem('darkmode') === 'true',
  );
}

onload = onload();
