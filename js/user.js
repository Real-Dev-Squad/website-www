import { BASE_URL } from './constants';

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

const lastLocation = sessionStorage.getItem('lastLocationUrl');
const fetchUserSelfData = async () => {
  try {
    const res = await makeApiCall(`${BASE_URL}/users/self`);
    const result = await res.data;
    if (result && lastLocation) {
      sessionStorage.removeItem('lastLocationUrl');
      // Redirect the user to the stored location
      window.location.href = lastLocation;
    }

    if (result.error) {
      throw new Error(result.error);
    }

    if (result.incompleteUserDetails) {
      return window.location.replace('https://my.realdevsquad.com/signup');
    }
    setUserGreeting(result.username, result.first_name, result.picture?.url); // BAD
  } catch (err) {
    console.error(err);
  }
};

export { fetchUserSelfData };
