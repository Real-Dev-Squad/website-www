const setUserGreeting = (username, firstName) => {
  if (username) {
    const userLoginEl = document.querySelector('.btn-login');

    const greetingEl = document.querySelector('.user-greet');
    const msgGreetMsgEl = document.querySelector('.user-greet-msg');
    const userImgEl = document.querySelector('.user-profile-pic');

    const greetMsg = `${firstName}!`;
    msgGreetMsgEl.innerText = greetMsg;
    const userImgURL = `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${username}/img.png`;
    userImgEl.src = userImgURL;

    greetingEl.style.display = 'block';
    userLoginEl.style.display = 'none';
  }
};

const selectRandom = (memberImgArr, n) => {
  const result = new Set();
  const len = memberImgArr.length;
  if (n > len)
    throw new RangeError('selectRandom: more elements taken than available');
  while (result.size !== n) {
    const x = Math.floor(Math.random() * len);
    result.add(memberImgArr[x]);
  }
  return result;
};

const displayMemberImgs = (memberImgArr) => {
  const images = selectRandom(memberImgArr, 5);
  const memberImg = document.querySelectorAll('.member-img');
  let i = 0;
  for (const img of images) {
    memberImg[i++].src = img.img_url;
  }
};

const getImgURL = (rdsId) =>
  `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${rdsId}/img.png`;

const getMemberImgs = () => {
  const memberImgArray = [];
  fetch('https://api.realdevsquad.com/members', {
    cache: 'default',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      const { members } = res;
      for (const { isMember, username } of members) {
        memberImgArray.push({
          isMember,
          username,
          img_url: getImgURL(username),
        });
      }
      const memberImgArr = memberImgArray.filter((person) => person.isMember);
      displayMemberImgs(memberImgArr);
    });
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
window.addEventListener('DOMContentLoaded', getMemberImgs);
