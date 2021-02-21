function redirectUserToPage (page) {
  const finalPage = (page == 'signup')
    ? 'https://my.realdevsquad.com/signup'
    : 'https://realdevsquad.com';
  
  window.location.href = finalPage;
}

function showSignupFormIfIncomplete () {
  fetch('https://api.realdevsquad.com/users/self', {
      headers: {'content-type': 'application/json'},
      credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
      if(data.incompleteUserDetails) {
        redirectUserToPage('signup');
      }
      else {
        redirectUserToPage('home');
      }
  }).catch(e => {
    redirectUserToPage('home');
  });
}

showSignupFormIfIncomplete();
