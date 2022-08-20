const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

const signout = () => {
  fetch('https://api.realdevsquad.com/auth/signout', {
    method: 'GET',
    credentials: 'include',
  }).then(() => {
    location.reload();
  });
};

document.getElementById('signout-option').addEventListener('click', () => {
  signout();
});

document.querySelectorAll('.user-greet').forEach((greet) => {
  greet.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
      dropdown.classList.toggle('hide');
    });
  });
});
