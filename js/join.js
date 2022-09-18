const startBtn = document.getElementById('start');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const city = document.getElementById('city');
const state = document.getElementById('state');
const country = document.getElementById('country');
const next1 = document.getElementById('next1');
const previous1 = document.getElementById('previous1');

function enableButton() {
  if (
    state.value.trim().length > 3 &&
    city.value.trim().length > 3 &&
    country.value.trim().length > 3
  ) {
    next1.classList.remove('button-disabled');
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

//Direct to the page user left from
window.addEventListener('load', () => {
  const currentFlowState = window.localStorage.getItem('flowState');
  if (currentFlowState == 0) {
    page1.classList.remove('hide-page');
    page2.classList.add('hide-page');
  } else if (currentFlowState == 1) {
    page1.classList.add('hide-page');
    page2.classList.remove('hide-page');
    city.value = window.localStorage.getItem('city');
    state.value = window.localStorage.getItem('state');
    country.value = window.localStorage.getItem('country');
    enableButton();
  }
});

//Value updaters
city.addEventListener('input', () => {
  window.localStorage.setItem('city', city.value);
  enableButton();
});

state.addEventListener('input', () => {
  window.localStorage.setItem('state', state.value);
  enableButton();
});

country.addEventListener('input', () => {
  window.localStorage.setItem('country', country.value);
  enableButton();
});

//Button Enablers

startBtn.addEventListener('click', () => {
  page1.classList.add('hide-page');
  page2.classList.remove('hide-page');
  window.localStorage.setItem('flowState', flowState.personalDetailsPage);
});

previous1.addEventListener('click', () => {
  window.localStorage.clear();
  window.localStorage.setItem('flowState', flowState.notStarted);
  location.reload();
});
