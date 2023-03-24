import { BASE_URL } from './constants.js';

let notAuthorized = document.querySelector('.not-authorized-page');
const notFound = document.querySelector('.not-found-page');
let mainContainer = document.querySelector('.intro-main');

async function makeApiCall(
  url,
  method = 'get',
  body = null,
  credentials = 'include',
  headers = { 'content-type': 'application/json' },
  options = null,
) {
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
      credentials,
      ...options,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

function createElement({ type, classList = [], id }) {
  const element = document.createElement(type);
  element.classList.add(...classList);
  element.id = id;
  return element;
}

function getUserId() {
  const currentUrl = window.location.href;
  if (currentUrl.split('?').length == 1) {
    return 'wrong url';
  } else {
    return currentUrl.split('?')[1];
  }
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
    classList: ['not-authorized-text-h1'],
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
    classList: ['not-found-text-h1'],
  });
  notFoundText.innerText = "The page you're looking for cannot be found";
  notFoundDiv.append(notFoundImg, notFoundText);
  notFound.appendChild(notFoundDiv);
}

//generate form and render information
function generateSavedDetailsForm(users) {
  const renderIntroPage = createElement({
    type: 'section',
    classList: ['render-page'],
    id: 'render-page',
  });
  const greeting = createElement({ type: 'h1', classList: ['greeting'] });
  greeting.innerText =
    "Thanks for filling out join form 👀 Here's what was received.";
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

  document.querySelector('.intro-main').appendChild(renderIntroPage);
}

//making userSavedData object from API
async function showSavedDetails() {
  try {
    const userId = getUserId();
    if (userId == 'wrong url') {
      generateNoDataFoundPage();
      throw err;
    }
    const usersRequest = await makeApiCall(`${BASE_URL}/users/${userId}/intro`);
    if (usersRequest.status === 200) {
      const usersDataList = await usersRequest.json();
      const userData = usersDataList.data[0];
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
      setTimeout(() => {
        alert('SuperUser You Write Wrong Url');
        location.href = 'https://www.realdevsquad.com/intro.html';
      }, 1500);
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
      showSavedDetails();
    } else {
      notFound.classList.add('hidden');
      generatenotAuthorizedPage();
      mainContainer.classList.add('hidden');
    }
  } catch (err) {
    alert('something went wrong');
    location.href = 'https://realdevsquad.com';
  }
})();
