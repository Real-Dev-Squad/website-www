const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

const signout = () => {
  fetch('http://localhost:3000/auth/signout', {
    method: 'GET',
    credentials: 'include',
  }).then(() => {
    location.reload();
  });
};

document.getElementById('signout-option').addEventListener('click', () => {
  signout();
});

document.querySelectorAll('myprofile-option').forEach((option) => {
  option.addEventListener('click', () => {
    location.href = 'https://my.realdevsquad.com';
  });
});

document.querySelectorAll('.user-greet').forEach((greet) => {
  greet.addEventListener('click', () => {
    document.querySelector('.dropdown').classList.toggle('hide');
  });
});

//This code removes the dropdown if the user clicks anywhere apart from the user-greet
const dropdownTrigger = document.querySelectorAll('.user-greet');

document.addEventListener('click', (event) => {
  if (
    dropdownTrigger[0] != event.target.parentElement &&
    dropdownTrigger[1] != event.target.parentElement &&
    !document.querySelector('.dropdown').classList.contains('hide')
  ) {
    document.querySelector('.dropdown').classList.add('hide');
  }
});
