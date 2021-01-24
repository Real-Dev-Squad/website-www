function showSignupFormIfIncomplete () {
  fetch('https://staging-api.realdevsquad.com/users/self', {
      headers: {'content-type': 'application/json'},
      credentials: 'include'
  })
  .then(res => res.json())
  .then(data => {
      if(data.incompleteUserDetails) {
        window.location.href = 'https://my.realdevsquad.com/signup'
      } 
  });
}

showSignupFormIfIncomplete();
