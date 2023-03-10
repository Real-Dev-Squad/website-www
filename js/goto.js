import { SIGNUP, JOIN, HOME, SIGNUP_URL, HOME_URL } from './constants.js';

const hasJoinVisited = localStorage.getItem('hasJoinVisited');

function redirectUserToPage(page) {
  const finalPage =
    page == SIGNUP
      ? SIGNUP_URL
      : page == JOIN
      ? `${HOME_URL}/${JOIN}`
      : HOME_URL;
  window.location.href = finalPage;
}

function redirectionHandler(data) {
  if (data.incompleteUserDetails) {
    redirectUserToPage(SIGNUP);
  } else if (hasJoinVisited == 'true' || hasJoinVisited == null) {
    redirectUserToPage(JOIN);
  } else {
    redirectUserToPage(HOME);
  }
}

function showSignupFormIfIncomplete() {
  fetch('https://api.realdevsquad.com/users/self', {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      redirectionHandler(data);
    })
    .catch((e) => {
      redirectUserToPage(HOME);
    });
}

showSignupFormIfIncomplete();
