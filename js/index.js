import { SELF_URL } from './constants.js';

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

function popup(data) {
  const isDeveloper = data.roles.developer;
  const isDesigner = data.roles.designer;
  const isMaven = data.roles.maven;
  const isProductManager = data.roles.productmanager;
  if (
    data.incompleteUserDetails === false &&
    !isDeveloper &&
    !isDesigner &&
    !isMaven &&
    !isProductManager
  ) {
    const popupContainer = document.createElement('div');
    popupContainer.className = 'roles-container';

    const roleDetails = document.createElement('div');
    roleDetails.className = 'role-details';

    const roleHeading = document.createElement('h2');
    roleHeading.className = 'role-heading';
    roleHeading.textContent = 'Select your role';

    const roleDetailsField = document.createElement('div');
    roleDetailsField.className = 'role-details-field';

    const roleButton = document.createElement('div');
    roleButton.className = 'role-button';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';

    const spinner = document.createElement('span');
    spinner.className = 'spinner';
    submitButton.appendChild(spinner);

    roleButton.appendChild(submitButton);

    roleDetails.appendChild(roleHeading);
    roleDetails.appendChild(roleDetailsField);
    roleDetails.appendChild(roleButton);

    popupContainer.appendChild(roleDetails);
    popupContainer.style.display = 'none';
    const mainElement = document.querySelector('main');
    const firstChild = mainElement.firstChild;
    mainElement.insertBefore(popupContainer, firstChild);

    const roles = {};

    const labels = [
      { name: 'Developer', inputName: 'developer' },
      { name: 'Designer', inputName: 'designer' },
      { name: 'Maven', inputName: 'maven' },
      { name: 'Product Manager', inputName: 'productmanager' },
    ];

    function createCheckbox(labelInfo) {
      const label = document.createElement('label');
      label.className = 'checkbox-label';

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.name = labelInfo.inputName;
      input.className = 'checkbox-input';

      const labelText = document.createTextNode(labelInfo.name);

      label.appendChild(input);
      label.appendChild(labelText);
      return label;
    }

    labels.forEach((labelInfo) => {
      const checkbox = createCheckbox(labelInfo);
      roleDetailsField.appendChild(checkbox);
    });

    const registerUserRoles = async (roles) => {
      spinner.style.display = 'inline-block';
      submitButton.style.backgroundColor = '#ccc';
      const updateRoles = {
        roles: {
          ...data.roles,
          ...roles,
        },
      };
      const res = await fetch(`${SELF_URL}`, {
        method: 'PATCH',
        body: JSON.stringify(updateRoles),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      return res;
    };

    async function hidePopup() {
      const response = await registerUserRoles(roles);
      if (response.status === 204) {
        spinner.style.display = 'none';
        submitButton.style.backgroundColor = '#008000';
        submitButton.disabled = false;
        popupContainer.style.display = 'none';
      } else if (response.status === 401) {
        alert('You are not logged in! Redirecting you to login.');
        location.href = GITHUB_OAUTH;
      } else {
        alert('Something went wrong please contact admin');
      }
    }

    function updateRoles(event) {
      const checkbox = event.target;
      const name = checkbox.name;

      if (checkbox.checked) {
        roles[name] = true;
      } else {
        delete roles[name];
      }
      const anyCheckboxChecked = Object.keys(roles).length > 0;
      submitButton.disabled = !anyCheckboxChecked;
    }

    window.addEventListener('load', function () {
      popupContainer.style.display = 'flex';
      submitButton.disabled = true;
      const checkboxes = document.querySelectorAll('.checkbox-input');
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateRoles);
      });
    });

    submitButton.addEventListener('click', hidePopup);
  } else {
    const popupContainer = document.querySelector('.roles-container');
    popupContainer.style.display = 'none';
  }
}

function userData() {
  fetch(`${SELF_URL}`, {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      popup(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.get('dev') === 'true') {
  userData();
}
