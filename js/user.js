import { doesGitHubCookieExist } from '/js/github.js';
const setUserGreeting = (username, firstName, userProfilePicture) => {
  if (!doesGitHubCookieExist()) {
    return;
  }

  if (username) {
    const userLoginEl = document.querySelectorAll('.btn-login');

    const greetingEl = document.querySelectorAll('.user-greet');
    const msgGreetMsgEl = document.querySelectorAll('.user-greet-msg');
    const userImgEl = document.querySelectorAll('.user-profile-pic');

    const greetMsg = `Hello, ${firstName}!`;
    msgGreetMsgEl.forEach((element) => {
      element.innerText = greetMsg;
    });

    const userImgURL = userProfilePicture;

    userImgEl.forEach((element) => {
      if(userImgURL){element.src = userImgURL;}
      else{element.src='/img/profile.png';}
    });

    greetingEl.forEach((element) => {
      element.style.display = 'block';
    });
    userLoginEl.forEach((element) => {
      element.style.display = 'none';
    });
  }
};

const fetchData = () => {
  fetch('https://api.realdevsquad.com/users/self', {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.incompleteUserDetails) {
        return window.location.replace('https://my.realdevsquad.com/signup');
      }
      setUserGreeting(res.username, res.first_name, res.picture?.url); // BAD
    });
};

window.addEventListener('DOMContentLoaded', fetchData); //BAD, Also in index.js

export { fetchData };
