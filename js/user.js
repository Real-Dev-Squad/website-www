const setUserGreeting = (username, firstName) => {
  if (username) {
    const userLoginEl = document.querySelectorAll('.btn-login');

    const greetingEl = document.querySelectorAll('.user-greet');
    const msgGreetMsgEl = document.querySelectorAll('.user-greet-msg');
    const userImgEl = document.querySelectorAll('.user-profile-pic');

    const greetMsg = `Hello, ${firstName}!`;
    msgGreetMsgEl.forEach((element) => {
      element.innerText = greetMsg;
    });
    const userImgURL = `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${username}/img.png`;
    userImgEl.forEach((element) => {
      element.src = userImgURL;
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
      setUserGreeting(res.username, res.first_name);
    });
};

window.addEventListener('DOMContentLoaded', fetchData);
