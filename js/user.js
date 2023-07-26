import { BASE_URL, SIGNUP_URL } from './constants.js';

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
const showSignInButton = () => {
  const loginButtons = document.querySelectorAll('.btn-login-text');
  loginButtons.forEach((element) => {
    element.classList.remove('hidden');
  });
};
const lastLocation = sessionStorage.getItem('lastLocationUrl');
const fetchUserSelfData = async () => {
  try {
    const res = await makeApiCall(`${BASE_URL}/users/self`);
    const result = await res.data;
    if (result && lastLocation) {
      sessionStorage.removeItem('lastLocationUrl');
      window.location.href = lastLocation;
    }

    if (result.error) {
      showSignInButton();
      throw new Error(result.error);
    }

    if (result.incompleteUserDetails) {
      return window.location.replace(`${SIGNUP_URL}`);
    }
    setUserGreeting(result.username, result.first_name, result.picture?.url);
  } catch (err) {
    showSignInButton();
    console.error(err);
  }
};

export { fetchUserSelfData };
