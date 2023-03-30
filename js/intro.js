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
  img.setAttribute('alt', 'exclamation-icon');
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
  notAuthorizedImg.setAttribute('alt', 'not authorized page');
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

function queryParamsNotValid() {
  loading.classList.add('hidden');
  generateNoDataFoundPage();
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

  const firstName = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  firstName.innerText = 'First Name';
  const renderFName = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderFName',
  });
  renderFName.innerText = users.firstName;
  container.appendChild(firstName);
  container.appendChild(renderFName);

  const lastName = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  lastName.innerText = 'Last Name';
  const renderLName = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderLName',
  });
  renderLName.innerHTML = users.lastName;
  container.appendChild(lastName);
  container.appendChild(renderLName);

  const city = createElement({ type: 'p', classList: ['input-label-dark'] });
  city.innerText = 'City';
  const renderCity = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderCity',
  });
  renderCity.innerHTML = users.city;
  container.appendChild(city);
  container.appendChild(renderCity);

  const state = createElement({ type: 'p', classList: ['input-label-dark'] });
  state.innerText = 'State';
  const renderState = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderState',
  });
  renderState.innerHTML = users.state;
  container.appendChild(state);
  container.appendChild(renderState);

  const country = createElement({ type: 'p', classList: ['input-label-dark'] });
  country.innerText = 'Country';
  const renderCountry = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderCountry',
  });
  renderCountry.innerHTML = users.country;
  container.appendChild(country);
  container.appendChild(renderCountry);

  const introduction = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  introduction.innerText = 'Introduction';
  const renderIntro = createElement({
    type: 'p',
    classList: ['user-input', 'input-big'],
    id: 'renderIntro',
  });
  renderIntro.innerHTML = users.introduction;
  container.appendChild(introduction);
  container.appendChild(renderIntro);

  const skills = createElement({ type: 'p', classList: ['input-label-dark'] });
  skills.innerText = 'Skills';
  const renderSkills = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderSkills',
  });
  renderSkills.innerHTML = users.skills;
  container.appendChild(skills);
  container.appendChild(renderSkills);

  const institution = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  institution.innerText = 'Institution';
  const renderInstitution = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderSkills',
  });
  renderInstitution.innerHTML = users.institution;
  container.appendChild(institution);
  container.appendChild(renderInstitution);

  const forFun = createElement({ type: 'p', classList: ['input-label-dark'] });
  forFun.innerText = 'What you do for fun';
  const renderForFun = createElement({
    type: 'p',
    classList: ['user-input', 'input-big'],
    id: 'renderForFun',
  });
  renderForFun.innerHTML = users.forFun;
  container.appendChild(forFun);
  container.appendChild(renderForFun);

  const funFact = createElement({ type: 'p', classList: ['input-label-dark'] });
  funFact.innerText = 'A fun fact about you';
  const renderFunFact = createElement({
    type: 'p',
    classList: ['user-input', 'input-big'],
    id: 'renderFunFact',
  });
  renderFunFact.innerHTML = users.funFact;
  container.appendChild(funFact);
  container.appendChild(renderFunFact);

  const whyRds = createElement({ type: 'p', classList: ['input-label-dark'] });
  whyRds.innerText = 'Why do you want to join Real Dev Squad?';
  const renderWhyRds = createElement({
    type: 'p',
    classList: ['user-input', 'input-big'],
    id: 'renderWhyRds',
  });
  renderWhyRds.innerHTML = users.whyRds;
  container.appendChild(whyRds);
  container.appendChild(renderWhyRds);

  const heardAbout = createElement({
    type: 'p',
    classList: ['input-label-dark'],
  });
  heardAbout.innerText = 'How did you hear about us';
  const renderHeardAbout = createElement({
    type: 'p',
    classList: ['user-input', 'input-regular'],
    id: 'renderHeardAbout',
  });
  renderHeardAbout.innerText = users.foundFrom;
  container.appendChild(heardAbout);
  container.appendChild(renderHeardAbout);
  loading.classList.add('hidden');
  document.querySelector('.intro-main').appendChild(renderIntroPage);
}

//making userSavedData object from API
async function showSavedDetails(delay) {
  try {
    const userId = urlParams.get('id');
    const usersRequest = await makeApiCall(`${BASE_URL}/users/${userId}/intro`);
    if (usersRequest.status === 200) {
      const userData = usersRequest.data[0];
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
      setTimeout(() => {
        alert('SuperUser You Write Wrong userId');
        location.href = 'https://www.realdevsquad.com/intro.html';
      }, delay);
    }
  } catch (err) {
    console.log(err);
  }
}

(async function setAuth() {
  try {
    const res = await fetch(`${BASE_URL}/users/self`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const selfDetails = await res.json();
    if (selfDetails.roles.super_user) {
      notAuthorized.classList.add('hidden');
      mainContainer.classList.remove('hidden');
      if (!urlParams.has('id')) {
        queryParamsNotValid();
      } else {
        showSavedDetails(1500);
      }
    } else {
      if (!urlParams.has('id')) {
        queryParamsNotValid();
      } else {
        notFound.classList.add('hidden');
        loading.classList.add('hidden');
        generatenotAuthorizedPage();
        mainContainer.classList.add('hidden');
      }
    }
  } catch (err) {
    window.addEventListener('click', showToast('something went wrong', 6000));
    setTimeout(function () {
      window.location.href = HOME_URL;
    }, 5000);
  }
})();
