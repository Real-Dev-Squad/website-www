import { doesGitHubCookieExist } from '/js/github.js';

if (doesGitHubCookieExist()) {
  console.log('Logged in');
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
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');

const city = document.getElementById('city');
const state = document.getElementById('state');
const country = document.getElementById('country');
const next1 = document.getElementById('next1');
const previous1 = document.getElementById('previous1');

const introduction = document.getElementById('introduction');
const skills = document.getElementById('skills');
const college = document.getElementById('college');
const forFun = document.getElementById('for-fun');
const funFact = document.getElementById('fun-fact');
const next2 = document.getElementById('next2');
const previous2 = document.getElementById('previous2');

const whyRds = document.getElementById('whyRds');
const heardAbout = document.getElementById('heardAbout');
const previous3 = document.getElementById('previous3');
const next3 = document.getElementById('next3');

const pages = [page1, page2, page3, page4];

function showPage(currentFlowState) {
  for (let i = 0; i < pages.length; i++) {
    if (i == currentFlowState) {
      pages[i].classList.remove('hide-page');
    } else {
      pages[i].classList.add('hide-page');
    }
  }
}

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

function toggleNextButton() {
  if (arePersonalDetailsValid()) {
    next1.classList.remove('button-disabled');
  }
  if (introPageChecker()) {
    next2.classList.remove('button-disabled');
  }
  if (whyRdsPageChecker()) {
    next3.classList.remove('button-disabled');
  } else {
    next1.classList.add('button-disabled');
    next2.classList.add('button-disabled');
    next3.classList.add('button-disabled');
  }
}

function fieldAutofill() {
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

//Direct to the page user left from
window.addEventListener('load', () => {
  const currentFlowState = window.localStorage.getItem('flowState');
  showPage(currentFlowState);
  fieldAutofill();
  toggleNextButton(currentFlowState);
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
  fieldAutofill();
  toggleNextButton('page1');
});

previous1.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.notStarted);
  let currentFlowState = window.localStorage.getItem('flowState');
  showPage(currentFlowState);
});

next1.addEventListener('click', () => {
  if (arePersonalDetailsValid()) {
    window.localStorage.setItem('flowState', flowState.introductionPage);
    let currentFlowState = window.localStorage.getItem('flowState');
    showPage(currentFlowState);
  }
});

previous2.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.personalDetailsPage);
  let currentFlowState = window.localStorage.getItem('flowState');
  showPage(currentFlowState);
});

next2.addEventListener('click', () => {
  if (introPageChecker()) {
    window.localStorage.setItem('flowState', flowState.reasonForRdsPage);
    let currentFlowState = window.localStorage.getItem('flowState');
    showPage(currentFlowState);
  }
});

previous3.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.introductionPage);
  let currentFlowState = window.localStorage.getItem('flowState');
  showPage(currentFlowState);
});
