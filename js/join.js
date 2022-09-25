import { doesGitHubCookieExist } from '/js/github.js';

if (doesGitHubCookieExist()) {
  console.log('Logged in');
  fetchSavedDetails();
}

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

// variables for personal details Page
const city = document.getElementById('city');
const state = document.getElementById('state');
const country = document.getElementById('country');
const next1 = document.getElementById('next1');
const previous1 = document.getElementById('previous1');

// variables for introduction page
const introduction = document.getElementById('introduction');
const skills = document.getElementById('skills');
const college = document.getElementById('college');
const forFun = document.getElementById('for-fun');
const funFact = document.getElementById('fun-fact');
const next2 = document.getElementById('next2');
const previous2 = document.getElementById('previous2');

//variables for why RDS Page
const whyRds = document.getElementById('whyRds');
const heardAbout = document.getElementById('heardAbout');
const previous3 = document.getElementById('previous3');
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
const previous4 = document.getElementById('previous4');
const submit = document.getElementById('next4');

//Vatiables for Completed page
const personalLink = document.getElementById('personalLink');
const copyBtn = document.getElementById('copy');
const url = `https://api.realdevsquad.com/users/${localStorage.getItem(
  'userName',
)}/intro`;
personalLink.innerText = url;

function fetchSavedDetails() {
  fetch('https://api.realdevsquad.com/users/self', {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      window.localStorage.setItem('firstName', res.first_name);
      window.localStorage.setItem('lastName', res.last_name);
      window.localStorage.setItem('userName', res.username);
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
    state.value.trim().length > 3 &&
    city.value.trim().length > 3 &&
    country.value.trim().length > 3
  );
}

function introPageChecker() {
  return (
    introduction.value.trim().split(' ').length > 100 &&
    skills.value.trim().split(' ').length > 6 &&
    college.value.trim().split(' ').length > 5 &&
    forFun.value.trim().split(' ').length > 100 &&
    funFact.value.trim().split(' ').length > 100
  );
}

function whyRdsPageChecker() {
  return whyRds.value.trim().split(' ').length > 100 && heardAbout.value != '';
}

function dataValidator(element, size) {
  if (element.value.trim().split(' ').length > size) {
    element.classList.add('correct-data');
    element.classList.remove('incorrect-data');
  } else {
    element.classList.remove('correct-data');
    element.classList.add('incorrect-data');
  }
}

// Togglers Fillers
function toggleNextButton() {
  if (arePersonalDetailsValid()) {
    next1.classList.remove('button-disabled');
  } else {
    next1.classList.add('button-disabled');
  }
  if (introPageChecker()) {
    next2.classList.remove('button-disabled');
  } else {
    next2.classList.add('button-disabled');
  }
  if (whyRdsPageChecker()) {
    previewBtn.classList.remove('button-disabled');
  } else {
    previewBtn.classList.add('button-disabled');
  }
}

function autoFillTheFields() {
  city.value = window.localStorage.getItem('city');
  state.value = window.localStorage.getItem('state');
  country.value = window.localStorage.getItem('country');
  introduction.value = window.localStorage.getItem('introduction');
  skills.value = window.localStorage.getItem('skills');
  college.value = window.localStorage.getItem('college');
  forFun.value = window.localStorage.getItem('forFun');
  funFact.value = window.localStorage.getItem('funFact');
  whyRds.value = window.localStorage.getItem('whyRds');
  heardAbout.value = window.localStorage.getItem('heardAbout');
  dataValidator(introduction, 100);
  dataValidator(skills, 6);
  dataValidator(college, 5);
  dataValidator(forFun, 100);
  dataValidator(funFact, 100);
  dataValidator(whyRds, 100);
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
  previewHeardAbout.innerHTML = window.localStorage.getItem('heardAbout');
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
city.addEventListener('input', () => {
  window.localStorage.setItem('city', city.value);
  toggleNextButton();
});

state.addEventListener('input', () => {
  window.localStorage.setItem('state', state.value);
  toggleNextButton();
});

country.addEventListener('input', () => {
  window.localStorage.setItem('country', country.value);
  toggleNextButton();
});

introduction.addEventListener('input', () => {
  window.localStorage.setItem('introduction', introduction.value);
  toggleNextButton();
  dataValidator(introduction, 100);
});

skills.addEventListener('input', () => {
  window.localStorage.setItem('skills', skills.value);
  toggleNextButton();
  dataValidator(skills, 6);
});

college.addEventListener('input', () => {
  window.localStorage.setItem('college', college.value);
  toggleNextButton();
  dataValidator(college, 5);
});

forFun.addEventListener('input', () => {
  window.localStorage.setItem('forFun', forFun.value);
  toggleNextButton();
  dataValidator(forFun, 100);
});

funFact.addEventListener('input', () => {
  window.localStorage.setItem('funFact', funFact.value);
  toggleNextButton();
  dataValidator(funFact, 100);
});

whyRds.addEventListener('input', () => {
  window.localStorage.setItem('whyRds', whyRds.value);
  toggleNextButton();
  dataValidator(whyRds, 100);
});

heardAbout.addEventListener('input', () => {
  window.localStorage.setItem('heardAbout', heardAbout.value);
  toggleNextButton();
});

//Button Enablers

startBtn.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.personalDetailsPage);
  let currentFlowState = window.localStorage.getItem('flowState');
  showPage(currentFlowState);
  autoFillTheFields();
  toggleNextButton('page1');
});

previous1.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.notStarted);
  selectPage();
});

next1.addEventListener('click', () => {
  if (arePersonalDetailsValid()) {
    window.localStorage.setItem('flowState', flowState.introductionPage);
    selectPage();
  }
});

previous2.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.personalDetailsPage);
  selectPage();
});

next2.addEventListener('click', () => {
  if (introPageChecker()) {
    window.localStorage.setItem('flowState', flowState.reasonForRdsPage);
    selectPage();
  }
});

previous3.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.introductionPage);
  selectPage();
});

previewBtn.addEventListener('click', () => {
  if (whyRdsPageChecker()) {
    window.localStorage.setItem('flowState', flowState.previewPage);
    selectPage();
    previewFiller();
  }
});

previous4.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.reasonForRdsPage);
  selectPage();
});

submit.addEventListener('click', async () => {
  let userName = localStorage.getItem('userName');
  let url = `https://api.realdevsquad.com/users/${userName}/intro`;
  let data = JSON.stringify(localStorage);
  let method = 'POST';
  await fetch(url, {
    credentials: 'include',
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }).then(() => {
    window.localStorage.setItem('flowState', flowState.completedPage);
    selectPage();
  });
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(url);
});
