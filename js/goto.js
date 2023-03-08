const hasJoinVisited = localStorage.getItem('hasJoinVisited');

function redirectUserToPage(page) {
  const finalPage =
    page == 'signup'
      ? 'https://my.realdevsquad.com/signup?state=get-started'
      : page == 'join'
      ? 'https://realdevsquad.com/join'
      : 'https://realdevsquad.com';

  window.location.href = finalPage;
}

function redirectToJoinIfNotVisited() {
  if (hasJoinVisited == 'true' || hasJoinVisited == null) {
    redirectUserToPage('join.html');
  } else {
    redirectUserToPage('home');
  }
}

function showSignupFormIfIncomplete() {
  fetch('https://api.realdevsquad.com/users/self', {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.incompleteUserDetails) {
        redirectUserToPage('signup');
      } else {
        redirectToJoinIfNotVisited();
      }
    })
    .catch((e) => {
      redirectUserToPage('home');
    });
}

showSignupFormIfIncomplete();
