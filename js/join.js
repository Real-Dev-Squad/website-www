import {
  countryList,
  JOIN_POST_URL,
  BASE_URL,
  GITHUB_OAUTH,
  SELF_URL,
} from './constants.js';

fetchSavedDetails();

const flowState = {
  notStarted: 0,
  personalDetailsPage: 1,
  introductionPage: 2,
  reasonForRdsPage: 3,
  previewPage: 4,
  completedPage: 5,
};

const startBtn = document.getElementById('start');

// Getting all pages
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const page5 = document.getElementById('page5');
const page6 = document.getElementById('page6');

const sizeDef = {
  city: 1,
  state: 1,
  country: 1,
  skills: 5,
  college: 1,
  introduction: 100,
  whyRds: 100,
  forFun: 100,
  funFact: 100,
  foundFrom: 1,
};

let url;

const inputFields = document.querySelectorAll('input');
const textAreas = document.querySelectorAll('textarea');

//Adding Event Listeners
inputFields.forEach(inputEventAdder);
textAreas.forEach(inputEventAdder);

function inputEventAdder(field) {
  field.addEventListener('input', function () {
    window.localStorage.setItem(field.id, field.value);
    dataValidator(field, sizeDef[field.id]);
    toggleNextButton();
  });
}

// variables for personal details Page
const city = document.getElementById('city');
const state = document.getElementById('state');
const country = document.getElementById('country');
const next1 = document.getElementById('next1');
let htmlCountryList = ' ';
for (let i = 0; i <= countryList.length; i++) {
  htmlCountryList += `<option value="${countryList[i]}"> ${countryList[i]} </option>`;
}

country.innerHTML = htmlCountryList;

// variables for introduction page
const introduction = document.getElementById('introduction');
const skills = document.getElementById('skills');
const college = document.getElementById('college');
const forFun = document.getElementById('forFun');
const funFact = document.getElementById('funFact');
const next2 = document.getElementById('next2');

//variables for why RDS Page
const whyRds = document.getElementById('whyRds');
const foundFrom = document.getElementById('foundFrom');
const previewBtn = document.getElementById('next3');

//variables for preview pages
const previewFName = document.getElementById('previewFName');
const previewLName = document.getElementById('previewLName');
const previewCity = document.getElementById('previewCity');
const previewState = document.getElementById('previewState');
const previewCountry = document.getElementById('previewCountry');
const previewIntro = document.getElementById('previewIntro');
const previewSkills = document.getElementById('previewSkills');
const previewInstitution = document.getElementById('previewInstitution');
const previewFunFact = document.getElementById('previewFunFact');
const previewForFun = document.getElementById('previewForFun');
const previewWhyRds = document.getElementById('previewWhyRds');
const previewHeardAbout = document.getElementById('previewHeardAbout');
const submit = document.getElementById('next4');

//Variables for Completed page
const personalLink = document.getElementById('personalLink');
const copyBtn = document.getElementById('copy');

function fetchSavedDetails() {
  fetch(`${SELF_URL}`, {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => {
      if (res.status === 401) {
        alert('You are not logged in! Redirecting you to login.');
        location.href = GITHUB_OAUTH;
      }
      return res.json();
    })
    .then((res) => {
      window.localStorage.setItem('firstName', res.first_name);
      window.localStorage.setItem('lastName', res.last_name);
      url = `${BASE_URL}/users/${res.id}/intro`;
      personalLink.innerText = url;
    })
    .catch((err) => {
      alert(
        'We are facing an internal server error! Please try again after some time',
      );
      location.href = 'https://realdevsquad.com';
    });
}

const pages = [page1, page2, page3, page4, page5, page6];

function selectPage() {
  let currentFlowState = window.localStorage.getItem('flowState');
  showPage(currentFlowState);
}

function showPage(currentFlowState) {
  for (let i = 0; i < pages.length; i++) {
    if (i == currentFlowState) {
      pages[i].classList.remove('hide-page');
    } else {
      pages[i].classList.add('hide-page');
    }
  }
}

//Validators
function arePersonalDetailsValid() {
  return (
    state.value.trim().length >= 3 &&
    city.value.trim().length >= 3 &&
    country.value.trim() != ''
  );
}

function introPageValidator() {
  return (
    introduction.value.trim().split(' ').length >= sizeDef.introduction &&
    introduction.value.trim() != '' &&
    skills.value.trim().split(' ').length >= sizeDef.skills &&
    skills.value.trim() != '' &&
    college.value.trim().split(' ').length >= sizeDef.college &&
    college.value.trim() != '' &&
    forFun.value.trim().split(' ').length >= sizeDef.forFun &&
    forFun.value.trim() != '' &&
    funFact.value.trim().split(' ').length >= sizeDef.funFact &&
    funFact.value.trim() != ''
  );
}

function whyRdsPageValidator() {
  return (
    whyRds.value.trim().split(' ').length >= sizeDef.whyRds &&
    foundFrom.value != '' &&
    whyRds.value.trim() != ''
  );
}

function dataValidator(element, size) {
  let counter = document.getElementById(element.id + 'Counter');
  let words_left = size - element.value.trim().split(' ').length;
  counter.innerText = `At least, ${words_left} more word(s) required`;
  if (words_left <= 0) {
    counter.innerText = '';
  }
  if (element.value.trim().split(' ').length >= size && element.value != '') {
    element.classList.remove('incorrect-data');
  } else {
    element.classList.add('incorrect-data');
  }
}

// Togglers Fillers
function toggleNextButton() {
  if (arePersonalDetailsValid()) {
    next1.classList.remove('button-disabled');
    next1.classList.add('button-filled');
  } else {
    next1.classList.add('button-disabled');
    next1.classList.remove('button-filled');
  }
  if (introPageValidator()) {
    next2.classList.remove('button-disabled');
    next2.classList.add('button-filled');
  } else {
    next2.classList.add('button-disabled');
    next2.classList.remove('button-filled');
  }
  if (whyRdsPageValidator()) {
    previewBtn.classList.remove('button-disabled');
    previewBtn.classList.add('button-filled');
  } else {
    previewBtn.classList.add('button-disabled');
    previewBtn.classList.remove('button-filled');
  }
}

function getFromLocalStorage(field) {
  field.value = localStorage.getItem(field.id);
}

function autoFillTheFields() {
  inputFields.forEach((inputField) => {
    getFromLocalStorage(inputField);
  });
  textAreas.forEach((textArea) => {
    getFromLocalStorage(textArea);
  });
  getFromLocalStorage(foundFrom);
  getFromLocalStorage(country);
}

function previewFiller() {
  previewFName.innerText = window.localStorage.getItem('firstName');
  previewLName.innerHTML = window.localStorage.getItem('lastName');
  previewCity.innerHTML = window.localStorage.getItem('city');
  previewState.innerHTML = window.localStorage.getItem('state');
  previewCountry.innerHTML = window.localStorage.getItem('country');
  previewIntro.innerHTML = window.localStorage.getItem('introduction');
  previewSkills.innerHTML = window.localStorage.getItem('skills');
  previewInstitution.innerHTML = window.localStorage.getItem('college');
  previewForFun.innerHTML = window.localStorage.getItem('forFun');
  previewFunFact.innerHTML = window.localStorage.getItem('funFact');
  previewWhyRds.innerHTML = window.localStorage.getItem('whyRds');
  previewHeardAbout.innerHTML = window.localStorage.getItem('foundFrom');
}

function getJoinData() {
  const selectedData = [
    'firstName',
    'lastName',
    'city',
    'state',
    'country',
    'introduction',
    'skills',
    'college',
    'forFun',
    'whyRds',
    'foundFrom',
    'funFact',
  ];
  let data = {};
  selectedData.forEach((selection) => {
    data[selection] = window.localStorage.getItem(selection);
  });
  return data;
}

//Direct to the page user left from
window.addEventListener('load', () => {
  const currentFlowState = window.localStorage.getItem('flowState');
  showPage(currentFlowState);
  autoFillTheFields();
  toggleNextButton();
  if (currentFlowState == flowState.previewPage) {
    previewFiller();
  }
});

//initializer
if (!window.localStorage.getItem('flowState')) {
  window.localStorage.setItem('flowState', flowState.notStarted);
}

//Value updaters
foundFrom.addEventListener('input', () => {
  window.localStorage.setItem('foundFrom', foundFrom.value);
  toggleNextButton();
});

country.addEventListener('input', () => {
  window.localStorage.setItem('country', country.value);
  toggleNextButton();
});
//Button Enablers

startBtn.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.personalDetailsPage);
  let currentFlowState = localStorage.getItem('flowState');
  showPage(currentFlowState);
  autoFillTheFields();
  toggleNextButton('page1');
});

const previousButtons = document.querySelectorAll('.button-outline');
previousButtons.forEach((previousButton) => {
  previousButton.addEventListener('click', () => {
    let currentFlowState = localStorage.getItem('flowState');
    localStorage.setItem('flowState', currentFlowState - 1);
    selectPage();
  });
});

const nextButtons = document.querySelectorAll('.nextBtn');
nextButtons.forEach((nextButton) => {
  nextButton.addEventListener('click', () => {
    let currentFlowState = Number(localStorage.getItem('flowState'));
    if (currentFlowState == 1 && arePersonalDetailsValid()) {
      localStorage.setItem('flowState', (currentFlowState += 1));
    } else if (currentFlowState == 2 && introPageValidator()) {
      localStorage.setItem('flowState', (currentFlowState += 1));
    } else if (currentFlowState == 3 && whyRdsPageValidator()) {
      localStorage.setItem('flowState', (currentFlowState += 1));
      previewFiller();
    }
    selectPage();
  });
});

submit.addEventListener('click', async () => {
  const method = 'PUT';
  await fetch(JOIN_POST_URL, {
    credentials: 'include',
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(getJoinData()),
  })
    .then((res) => {
      if (res.status !== 201) {
        alert('Improper data. Please Re-check the data');
        return;
      }
      window.localStorage.setItem('flowState', flowState.completedPage);
      selectPage();
    })
    .catch((err) => {
      alert(`Error in saving user data ${err}`);
    });
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(url);
});
