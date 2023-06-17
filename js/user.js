import { BASE_URL } from "./constants";

const setUserGreeting = (username, firstName, userProfilePicture) => {
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
      element.src = userImgURL || '/img/profile.png';
    });

    greetingEl.forEach((element) => {
      element.style.display = 'block';
    });
    userLoginEl.forEach((element) => {
      element.style.display = 'none';
    });
  }
};

const lastLocation = sessionStorage.getItem('lastLocation');
const fetchData = async () => {
  const res = await fetch(`${BASE_URL}/self`, {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  });
  const result = await res.json();
  if (lastLocation && result) {
    sessionStorage.removeItem('lastLocation');
    window.location.href = lastLocation;
    setUserGreeting(result.username, result.first_name, result.picture?.url); // BAD
  }

  if (result.error) {
    throw new Error(result.error);
  }
  if (result.incompleteUserDetails) {
    return window.location.replace('https://my.realdevsquad.com/signup');
  }
  setUserGreeting(result.username, result.first_name, result.picture?.url); // BAD
};

export { fetchData };
