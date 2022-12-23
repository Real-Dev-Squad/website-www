import { updateGitHubLink } from '/js/github.js';
import { fetchData } from '/js/user.js';

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

const numOfMembers = 5;
let memberSection = document.getElementById('members');
for (let i = 0; i < numOfMembers; i++) {
  const memberLinks = document.createElement('a');
  memberLinks.classList.add('member-link');
  const memberTags = document.createElement('img');
  memberTags.classList.add('member-img', 'member_animation');
  memberTags.setAttribute('alt', 'Member Image');
  memberLinks.appendChild(memberTags);
  memberSection.appendChild(memberLinks);
}

const displayMemberImgs = (memberImgArr) => {
  const images = selectRandom(memberImgArr, numOfMembers);
  const memberLink = document.querySelectorAll('.member-link');
  const memberImg = document.querySelectorAll('.member-img');
  let i = 0;
  for (const img of images) {
    memberLink[i].href = img.member_url;
    memberImg[i++].src = img.img_url;
  }
  document.getElementById('shimmer').style.display = 'none';
  document.getElementById('members').style.display = 'flex';
};

const getMemberURL = (rdsId) => `https://members.realdevsquad.com/${rdsId}`;

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
      for (const { isMember, username, picture } of members) {
        let adjustedPicture = '';
        if (!!picture) {
          adjustedPicture = `${picture.url.slice(
            0,
            53,
          )}w_200,h_200${picture.url.slice(52)}`;
        } else {
          adjustedPicture = picture;
        }
        memberImgArray.push({
          isMember,
          username,
          img_url:
            adjustedPicture ||
            'https://raw.githubusercontent.com/Real-Dev-Squad/website-www/2271f2ee9834ebabfc102dbc0f8c4848673fc283/img/profile.png',
          member_url: getMemberURL(username),
        });
      }
      const memberImgArr = memberImgArray.filter((person) => person.isMember);
      displayMemberImgs(memberImgArr);
    });
};

window.addEventListener(
  'DOMContentLoaded',
  fetchData().catch((err) => updateGitHubLink()),
);

window.addEventListener('DOMContentLoaded', getMemberImgs);
const modalTriggers = document.querySelectorAll('.popup-trigger');
const modalCloseTrigger = document.querySelector('.popup-modal__close');
const bodyBlackout = document.querySelector('.body-blackout');

modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const { popupTrigger } = trigger.dataset;
    const popupModal = document.querySelector(
      `[data-popup-modal="${popupTrigger}"]`,
    );

    popupModal.classList.add('is--visible');
    bodyBlackout.classList.add('is-blacked-out');

    popupModal
      .querySelector('.popup-modal__close')
      .addEventListener('click', () => {
        popupModal.classList.remove('is--visible');
        bodyBlackout.classList.remove('is-blacked-out');
      });

    bodyBlackout.addEventListener('click', () => {
      popupModal.classList.remove('is--visible');
      bodyBlackout.classList.remove('is-blacked-out');
    });
  });
});
