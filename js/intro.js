import { BASE_URL, HOME_URL } from './constants.js';

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
  notAuthorizedImg.src = 'img/intro-page/page-not-authorized.png';
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
  notFoundImg.src = '/img/intro-page/page-not-found.png';
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
  greeting.innerText = `Let's Check ${users.firstName} Information📜`;
  renderIntroPage.appendChild(greeting);

  const container = createElement({ type: 'div', classList: ['container'] });
  renderIntroPage.appendChild(container);

  const firstNameLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  firstNameLabel.innerText = 'First Name';
  const firstNameValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderFName',
  });
  firstNameValue.innerText = users.firstName;
  container.appendChild(firstNameLabel);
  container.appendChild(firstNameValue);

  const lastNameLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  lastNameLabel.innerText = 'Last Name';
  const lastNameValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderLName',
  });
  lastNameValue.innerHTML = users.lastName;
  container.appendChild(lastNameLabel);
  container.appendChild(lastNameValue);

  const cityLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  cityLabel.innerText = 'City';
  const cityValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderCity',
  });
  cityValue.innerHTML = users.city;
  container.appendChild(cityLabel);
  container.appendChild(cityValue);

  const stateLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  stateLabel.innerText = 'State';
  const stateValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderState',
  });
  stateValue.innerHTML = users.state;
  container.appendChild(stateLabel);
  container.appendChild(stateValue);

  const countryLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  countryLabel.innerText = 'Country';
  const countryValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderCountry',
  });
  countryValue.innerHTML = users.country;
  container.appendChild(countryLabel);
  container.appendChild(countryValue);

  const introductionLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  introductionLabel.innerText = 'Introduction';
  const introValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-big'],
    id: 'renderIntro',
  });
  introValue.innerHTML = users.introduction;
  container.appendChild(introductionLabel);
  container.appendChild(introValue);

  const skillsLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  skillsLabel.innerText = 'Skills';
  const skillsValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderSkills',
  });
  skillsValue.innerHTML = users.skills;
  container.appendChild(skillsLabel);
  container.appendChild(skillsValue);

  const institutionLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  institutionLabel.innerText = 'Institution';
  const institutionValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderSkills',
  });
  institutionValue.innerHTML = users.institution;
  container.appendChild(institutionLabel);
  container.appendChild(institutionValue);

  const forFunLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  forFunLabel.innerText = 'What you do for fun';
  const forFunValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-big'],
    id: 'renderForFun',
  });
  forFunValue.innerHTML = users.forFun;
  container.appendChild(forFunLabel);
  container.appendChild(forFunValue);

  const funFactLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  funFactLabel.innerText = 'A fun fact about you';
  const funFactValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-big'],
    id: 'renderFunFact',
  });
  funFactValue.innerHTML = users.funFact;
  container.appendChild(funFactLabel);
  container.appendChild(funFactValue);

  const whyRdsLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  whyRdsLabel.innerText = 'Why do you want to join Real Dev Squad?';
  const whyRdsValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-big'],
    id: 'renderWhyRds',
  });
  whyRdsValue.innerHTML = users.whyRds;
  container.appendChild(whyRdsLabel);
  container.appendChild(whyRdsValue);

  const heardAboutLabel = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  heardAboutLabel.innerText = 'How did you hear about us';
  const heardAboutValue = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderHeardAbout',
  });
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
        foundFrom: userData.foundFrom,
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
    console.log(err);
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
    window.addEventListener('click', showToast('something went wrong', 6000));
    setTimeout(function () {
      window.location.href = HOME_URL;
    }, 5000);
  }
})();
