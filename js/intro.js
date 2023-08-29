import { BASE_URL, GITHUB_OAUTH, HOME_URL } from './constants.js';

const notAuthorized = document.querySelector('.not-authorized-page');
const notFound = document.querySelector('.not-found-page');
const mainContainer = document.querySelector('.intro-main');
const loading = document.querySelector('.loading');
const toastBox = document.querySelector('.toast-box');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function showToast(err, delay) {
  const toast = createElement({
    type: 'div',
    classList: ['toast'],
  });
  const img = createElement({
    type: 'img',
    classList: ['icon'],
  });
  img.src = 'img/intro-page/exclamation-circle.svg';
  img.setAttribute('alt', 'exclamation-mark');
  toast.textContent = err;
  toast.prepend(img);
  toastBox.append(toast);
  setTimeout(() => {
    toast.remove();
  }, delay);
}

function generatenotAuthorizedPage() {
  const notAuthorizedDiv = createElement({
    type: 'div',
    classList: ['not-authorized'],
  });
  const notAuthorizedImg = createElement({
    type: 'img',
    classList: ['not-authorized-img'],
  });
  notAuthorizedImg.src = 'img/intro-page/page-not-authorized.svg';
  notAuthorizedImg.setAttribute('alt', 'not-authorized');
  const notAuthorizedText = createElement({
    type: 'h1',
    classList: ['not-authorized-text'],
  });
  notAuthorizedText.innerText = 'You are not authorized to view this page';
  notAuthorizedDiv.append(notAuthorizedImg, notAuthorizedText);
  notAuthorized.append(notAuthorizedDiv);
}

function generateNoDataFoundPage() {
  const notFoundDiv = createElement({ type: 'div', classList: ['not-found'] });
  const notFoundImg = createElement({
    type: 'img',
    classList: ['not-found-img'],
  });
  notFoundImg.src = '/img/intro-page/page-not-found.svg';
  notFoundImg.setAttribute('alt', 'page not found');
  const notFoundText = createElement({
    type: 'h1',
    classList: ['not-found-text'],
  });
  notFoundText.innerText = "The page you're looking for cannot be found";
  notFoundDiv.append(notFoundImg, notFoundText);
  notFound.appendChild(notFoundDiv);
}

function generateSavedDetailsForm(users) {
  const renderIntroPage = createElement({
    type: 'section',
    classList: ['render-page'],
    id: 'render-page',
  });
  const greeting = createElement({ type: 'h1', classList: ['greeting'] });
  greeting.innerText = `Let's check ${users.firstName}'s information📜`;
  renderIntroPage.appendChild(greeting);

  const container = createElement({ type: 'div', classList: ['container'] });
  renderIntroPage.appendChild(container);

  const githubCreatedValue = createElement({
    type: 'h4',
    classList: [
      `${
        users.dateDiff.creationValue.years > 0
          ? 'github-created-text'
          : 'github-created-alert'
      }`,
    ],
  });

  const showAgoWord = users.dateDiff.creationValue.days >= 1;
  githubCreatedValue.innerText = `User GitHub account created ${
    users.dateDiff.textValue
  }${showAgoWord ? ' ago' : ''}`;
  container.appendChild(githubCreatedValue);

  const nameLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const nameValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderFName',
  });
  nameLabel.innerText = 'Name';
  nameValue.innerText = `${users.firstName} ${users.lastName}`;
  container.appendChild(nameLabel);
  container.appendChild(nameValue);

  const cityAndStateLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const cityAndStateValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderCity',
  });
  cityAndStateLabel.innerText = 'City & State';
  cityAndStateValue.innerHTML = `${users.city}, ${users.state}`;
  container.appendChild(cityAndStateLabel);
  container.appendChild(cityAndStateValue);

  const countryLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const countryValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderCountry',
  });
  countryLabel.innerText = 'Country';
  countryValue.innerHTML = users.country;
  container.appendChild(countryLabel);
  container.appendChild(countryValue);

  const introductionLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const introValue = createElement({
    type: 'p',
    classList: ['user-input'],
    id: 'renderIntro',
  });
  introductionLabel.innerText = 'Introduction';
  introValue.innerHTML = users.introduction;
  container.appendChild(introductionLabel);
  container.appendChild(introValue);

  const skillsLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const skillsValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderSkills',
  });
  skillsLabel.innerText = 'Skills';
  skillsValue.innerHTML = users.skills;
  container.appendChild(skillsLabel);
  container.appendChild(skillsValue);

  const institutionLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const institutionValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderSkills',
  });
  institutionLabel.innerText = 'Institution';
  institutionValue.innerHTML = users.institution;
  container.appendChild(institutionLabel);
  container.appendChild(institutionValue);

  const forFunLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const forFunValue = createElement({
    type: 'p',
    classList: ['user-input'],
    id: 'renderForFun',
  });
  forFunLabel.innerText = 'What you do for fun';
  forFunValue.innerHTML = users.forFun;
  container.appendChild(forFunLabel);
  container.appendChild(forFunValue);

  const funFactLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const funFactValue = createElement({
    type: 'p',
    classList: ['user-input'],
    id: 'renderFunFact',
  });
  funFactLabel.innerText = 'A fun fact about you';
  funFactValue.innerHTML = users.funFact;
  container.appendChild(funFactLabel);
  container.appendChild(funFactValue);

  const whyRdsLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const whyRdsValue = createElement({
    type: 'p',
    classList: ['user-input'],
    id: 'renderWhyRds',
  });
  whyRdsLabel.innerText = 'Why do you want to join Real Dev Squad?';
  whyRdsValue.innerHTML = users.whyRds;
  container.appendChild(whyRdsLabel);
  container.appendChild(whyRdsValue);

  const numberOfHoursLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const numberOfHoursValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'rendernumberOfHours',
  });
  numberOfHoursLabel.innerText =
    'How many hours per week, would you contribute?';
  numberOfHoursValue.innerText = users.numberOfHours;
  container.appendChild(numberOfHoursLabel);
  container.appendChild(numberOfHoursValue);

  const heardAboutLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  const heardAboutValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderHeardAbout',
  });
  heardAboutLabel.innerText = 'How did you hear about us';
  heardAboutValue.innerText = users.foundFrom;
  container.appendChild(heardAboutLabel);
  container.appendChild(heardAboutValue);
  loading.classList.add('hidden');
  document.querySelector('.intro-main').appendChild(renderIntroPage);
}

//making userSavedData object from API
async function showSavedDetails() {
  try {
    const userId = urlParams.get('id');
    const usersRequest = await makeApiCall(`${BASE_URL}/users/${userId}/intro`);
    const userInformation = await makeApiCall(
      `${BASE_URL}/users/userId/${userId}`,
    );

    const dateDiff = dateDifference(
      userInformation?.data.user?.github_created_at,
      new Date().getTime(),
    );

    const githubCreatedDateRelative = getRelativeDateString(dateDiff);
    const UserGithubCreatedValue = {
      textValue: githubCreatedDateRelative,
      creationValue: dateDiff,
    };

    if (usersRequest.status === 200) {
      const userData = usersRequest.data.data[0];
      let userSavedData = {
        firstName: userData.biodata.firstName,
        lastName: userData.biodata.lastName,
        city: userData.location.city,
        state: userData.location.state,
        country: userData.location.country,
        introduction: userData.intro.introduction,
        skills: userData.professional.skills,
        institution: userData.professional.institution,
        funFact: userData.intro.funFact,
        forFun: userData.intro.forFun,
        whyRds: userData.intro.whyRds,
        numberOfHours: userData.intro.numberOfHours,
        foundFrom: userData.foundFrom,
        dateDiff: UserGithubCreatedValue,
      };
      generateSavedDetailsForm(userSavedData);
    } else if (usersRequest.status === 404) {
      generateNoDataFoundPage();
      loading.classList.add('hidden');
      window.addEventListener(
        'click',
        showToast('Invalid user id entered', 6000),
      );
      setTimeout(function () {
        location.href = 'https://www.realdevsquad.com/intro.html';
      }, 5000);
    }
  } catch (err) {
    console.error(err);
  }
}

(async function setAuth() {
  try {
    const res = await makeApiCall(`${BASE_URL}/users/self`);
    const selfDetails = await res.data;
    if (selfDetails.roles.super_user) {
      notAuthorized.classList.add('hidden');
      mainContainer.classList.remove('hidden');
      if (!urlParams.has('id')) {
        loading.classList.add('hidden');
        generateNoDataFoundPage();
      } else {
        showSavedDetails();
      }
    } else {
      notFound.classList.add('hidden');
      loading.classList.add('hidden');
      generatenotAuthorizedPage();
      mainContainer.classList.add('hidden');
    }
  } catch (err) {
    console.error(err);
    loading.classList.add('hidden');
    generatenotAuthorizedPage();
    setTimeout(function () {
      alert('You are not logged in! Redirecting you to login.');
      window.location.href = GITHUB_OAUTH;
      sessionStorage.setItem('lastLocationUrl', window.location.href);
    }, 1000);
  }
})();
