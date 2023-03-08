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

function showSignupFormIfIncomplete() {
  fetch('https://api.realdevsquad.com/users/self', {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.incompleteUserDetails) {
        redirectUserToPage('signup');
      } else if (!hasJoinVisited) {
        redirectUserToPage('join');
      } else {
        redirectUserToPage('home');
      }
    })
    .catch((e) => {
      redirectUserToPage('home');
    });
}

showSignupFormIfIncomplete();
