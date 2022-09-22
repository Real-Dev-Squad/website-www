const startBtn = document.getElementById('start');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');

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

function dataValidator(element, size) {
  if (element.value.trim().length > size) {
    element.classList.add('correct-data');
    element.classList.remove('incorrect-data');
  } else {
    element.classList.remove('correct-data');
    element.classList.add('incorrect-data');
  }
}

function toggleButton(page = 'page2') {
  if (page === 'page2') {
    if (
      state.value.trim().length > 3 &&
      city.value.trim().length > 3 &&
      country.value.trim().length > 3
    ) {
      next1.classList.remove('button-disabled');
    } else {
      if (!next1.classList.contains('button-disabled')) {
        next1.classList.add('button-disabled');
      }
    }
  } else if (page === 'page3') {
    if (
      introduction.value.trim().length > 100 &&
      skills.value.trim().length > 50 &&
      college.value.trim().length > 25 &&
      forFun.value.trim().length > 100 &&
      funFact.value.trim().length > 100
    ) {
      next2.classList.remove('button-disabled');
    } else {
      if (!next2.classList.contains('button-disabled')) {
        next2.classList.add('button-disabled');
      }
    }
  }
}

const flowState = {
  notStarted: 0,
  personalDetailsPage: 1,
  introductionPage: 2,
  reasonForRdsPage: 3,
  previewPage: 4,
  completedPage: 5,
};

function fieldAutofill() {
  city.value = window.localStorage.getItem('city');
  state.value = window.localStorage.getItem('state');
  country.value = window.localStorage.getItem('country');
  introduction.value = window.localStorage.getItem('introduction');
  skills.value = window.localStorage.getItem('skills');
  college.value = window.localStorage.getItem('college');
  forFun.value = window.localStorage.getItem('forFun');
  funFact.value = window.localStorage.getItem('funFact');
  dataValidator(introduction, 100);
  dataValidator(skills, 50);
  dataValidator(college, 25);
  dataValidator(forFun, 100);
  dataValidator(funFact, 100);
}

//Direct to the page user left from
window.addEventListener('load', () => {
  const currentFlowState = window.localStorage.getItem('flowState');
  if (currentFlowState == 0) {
    page1.classList.remove('hide-page');
    page2.classList.add('hide-page');
    page3.classList.add('hide-page');
  } else if (currentFlowState == 1) {
    page1.classList.add('hide-page');
    page2.classList.remove('hide-page');
    page3.classList.add('hide-page');
    fieldAutofill();
    toggleButton();
  } else if (currentFlowState == 2) {
    page1.classList.add('hide-page');
    page2.classList.add('hide-page');
    page3.classList.remove('hide-Page');
    fieldAutofill();
    toggleButton();
  } else if (currentFlowState == 3) {
    page1.classList.add('hide-page');
    page2.classList.add('hide-page');
    page3.classList.remove('hide-Page');
    fieldAutofill();
    toggleButton('page3');
  }
});

//initializer
if (!window.localStorage.getItem('flowState')) {
  window.localStorage.setItem('flowState', flowState.notStarted);
}

//Value updaters
city.addEventListener('input', () => {
  window.localStorage.setItem('city', city.value);
  toggleButton();
});

state.addEventListener('input', () => {
  window.localStorage.setItem('state', state.value);
  toggleButton();
});

country.addEventListener('input', () => {
  window.localStorage.setItem('country', country.value);
  toggleButton();
});

introduction.addEventListener('input', () => {
  window.localStorage.setItem('introduction', introduction.value);
  toggleButton('page3');
  dataValidator(introduction, 100);
});

skills.addEventListener('input', () => {
  window.localStorage.setItem('skills', skills.value);
  toggleButton('page3');
  dataValidator(skills, 50);
});

college.addEventListener('input', () => {
  window.localStorage.setItem('college', college.value);
  toggleButton('page3');
  dataValidator(college, 25);
});

forFun.addEventListener('input', () => {
  window.localStorage.setItem('forFun', forFun.value);
  toggleButton('page3');
  dataValidator(forFun, 100);
});

funFact.addEventListener('input', () => {
  window.localStorage.setItem('funFact', funFact.value);
  toggleButton('page3');
  dataValidator(funFact, 100);
});

//Button Enablers

startBtn.addEventListener('click', () => {
  page1.classList.add('hide-page');
  page2.classList.remove('hide-page');
  page3.classList.add('hide-page');
  window.localStorage.setItem('flowState', flowState.personalDetailsPage);
  fieldAutofill();
  toggleButton('page1');
});

previous1.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.notStarted);
  page1.classList.remove('hide-page');
  page2.classList.add('hide-page');
  page3.classList.add('hide-page');
});

next1.addEventListener('click', () => {
  if (!next1.classList.contains('button-disabled')) {
    window.localStorage.setItem('flowState', flowState.introductionPage);
    page1.classList.add('hide-page');
    page2.classList.add('hide-page');
    page3.classList.remove('hide-page');
  }
});

previous2.addEventListener('click', () => {
  window.localStorage.setItem('flowState', flowState.personalDetailsPage);
  page1.classList.add('hide-page');
  page2.classList.remove('hide-page');
  page3.classList.add('hide-page');
});
