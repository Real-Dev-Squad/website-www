import { SIGNUP_URL, HOME_URL } from './constants.js';

const hasVisitedJoin = localStorage.getItem('hasVisitedJoin');

function redirectUserToPage(page) {
  window.location.href = page;
}

function redirectionHandler(data) {
  if (data.incompleteUserDetails) {
    redirectUserToPage(SIGNUP_URL);
  } else if (
    data.incompleteUserDetails === false &&
    data.roles.developer === undefined &&
    data.roles.designer === undefined &&
    data.roles.maven === undefined &&
    data.roles.productmanager === undefined
  ) {
    redirectUserToPage(HOME_URL);
  } else if (hasVisitedJoin == 'true' || hasVisitedJoin == null) {
    redirectUserToPage(`${HOME_URL}/join`);
  } else {
    redirectUserToPage(HOME_URL);
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
      redirectUserToPage(HOME_URL);
    });
}

showSignupFormIfIncomplete();
