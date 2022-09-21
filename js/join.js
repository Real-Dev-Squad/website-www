const startBtn = document.getElementById('start');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const city = document.getElementById('city');
const state = document.getElementById('state');
const country = document.getElementById('country');
const next1 = document.getElementById('next1');
const previous1 = document.getElementById('previous1');

function toggleButton(page = 'page1') {
  if (page === 'page1') {
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
