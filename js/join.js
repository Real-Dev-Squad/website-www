import {
  countryList,
  JOIN_POST_URL,
  HOME_URL,
  GITHUB_OAUTH,
  SELF_URL,
} from './constants.js';

const reloadFunc = () => {
  let flowState = +window.localStorage.getItem('flowState');
  flowState += 1;
  const currentPage = document.getElementById('page' + flowState);
  const inputElements = currentPage.getElementsByTagName('input');
  const textElements = currentPage.getElementsByTagName('textarea');
  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].type === 'number') {
      numberDataValidator(
        inputElements[i],
        range[inputElements[i].id][0],
        range[inputElements[i].id][1],
      );
    } else dataValidator(inputElements[i], sizeDef[inputElements[i].id]);
  }
  for (let i = 0; i < textElements.length; i++) {
    dataValidator(textElements[i], sizeDef[textElements[i].id]);
  }
};

window.localStorage.setItem('hasVisitedJoin', true);
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

//specifying range of number fields : min to max.
const range = {
  numberOfHours: [1, 100],
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
    if (field.type === 'number')
      numberDataValidator(field, range[field.id][0], range[field.id][1]);
    else dataValidator(field, sizeDef[field.id]);
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
const numberOfHours = document.getElementById('numberOfHours');
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
const previewNumberOfHours = document.getElementById('previewNumberOfHours');
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
      url = `${HOME_URL}/intro.html?id=${res.id}`;
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
    whyRds.value.trim() != '' &&
    numberOfHours.value != '' &&
    +numberOfHours.value >= range['numberOfHours'][0] &&
    +numberOfHours.value <= range['numberOfHours'][1]
  );
}

function numberDataValidator(element, min, max) {
  const id = element.id;
  let invalidElement = document.getElementById(id);
  if (+invalidElement.value < min || +invalidElement.value > max) {
    document.getElementById(
      id + 'Counter',
    ).innerText = `Invalid Value- must be between ${min} to ${max}`;
    invalidElement.classList.add('incorrect-data');
  } else {
    document.getElementById(id + 'Counter').innerText = '';
    invalidElement.classList.remove('incorrect-data');
  }
}

function dataValidator(element, size) {
  let counter = document.getElementById(element.id + 'Counter');
  if (size != 0) counter.innerText = `At least, ${size} more word(s) required`;
  if (size != 0) element.classList.add('incorrect-data');
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
  previewLName.innerText = window.localStorage.getItem('lastName');
  previewCity.innerText = window.localStorage.getItem('city');
  previewState.innerText = window.localStorage.getItem('state');
  previewCountry.innerText = window.localStorage.getItem('country');
  previewIntro.innerText = window.localStorage.getItem('introduction');
  previewSkills.innerText = window.localStorage.getItem('skills');
  previewInstitution.innerText = window.localStorage.getItem('college');
  previewForFun.innerText = window.localStorage.getItem('forFun');
  previewFunFact.innerText = window.localStorage.getItem('funFact');
  previewWhyRds.innerText = window.localStorage.getItem('whyRds');
  previewHeardAbout.innerText = window.localStorage.getItem('foundFrom');
  previewNumberOfHours.innerText = window.localStorage.getItem('numberOfHours');
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
    'numberOfHours',
  ];
  let data = {};
  selectedData.forEach((selection) => {
    if (selection.includes('number')) {
      data[selection] = +window.localStorage.getItem(selection);
    } else data[selection] = window.localStorage.getItem(selection);
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

window.onload = setTimeout(reloadFunc, 100);

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
      window.localStorage.setItem('hasVisitedJoin', false);
    })
    .catch((err) => {
      alert(`Error in saving user data ${err}`);
    });
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(`Real Dev Squad Verification Link: ${url}`);
});

document.querySelector('#introduction').addEventListener('mouseleave', (event) => {
  let count = 0;
  let textArea = Array.from(document.querySelector('#introduction').value);
  for (let i = 0; i < textArea.length; i++) {
    let char = textArea[i];
    if (/[a-zA-Z]/.test(char)) {
      count++;
    }
  }

  if (count < 100) {
    dataValidator(document.querySelector('#introduction'), 100 - count);
  } else if (count >= 100) {
    document.querySelector('#introductionCounter').innerText = '';
    document.querySelector('#introduction').classList.remove('incorrect-data');
  }
});
document.querySelector('#skills').addEventListener('mouseleave', (event) => {
  let textArea = Array.from(document.querySelector('#skills').value);
  let count = 0;
  for (let i = 0; i < textArea.length; i++) {
    let char = textArea[i];
    if (/[a-zA-Z]/.test(char)) {
      count++;
    }
  }

  if (count < 5) {
    dataValidator(document.querySelector('#skills'), 5 - count);
  } else if (count >= 5) {
    document.querySelector('#skillsCounter').innerText = '';
    document.querySelector('#skills').classList.remove('incorrect-data');
  }
});
document.querySelector('#college').addEventListener('mouseleave', (event) => {
  let textArea = Array.from(document.querySelector('#college').value);
  let count = 0;
  for (let i = 0; i < textArea.length; i++) {
    let char = textArea[i];
    if (/[a-zA-Z]/.test(char)) {
      count++;
    }
  }

  if (count < 1) {
    dataValidator(document.querySelector('#college'), 1 - count);
  } else if (count >= 1) {
    document.querySelector('#collegeCounter').innerText = '';
    document.querySelector('#college').classList.remove('incorrect-data');
  }
});
document.querySelector('#forFun').addEventListener('mouseleave', (event) => {
  let textArea = Array.from(document.querySelector('#forFun').value);
  let count = 0;
  for (let i = 0; i < textArea.length; i++) {
    let char = textArea[i];
    if (/[a-zA-Z]/.test(char)) {
      count++;
    }
  }

  if (count < 100) {
    dataValidator(document.querySelector('#forFun'), 100 - count);
  } else if (count >= 100) {
    document.querySelector('#forFunCounter').innerText = '';
    document.querySelector('#forFun').classList.remove('incorrect-data');
  }
});

document.querySelector('#funFact').addEventListener('mouseleave', (event) => {
  let textArea = Array.from(document.querySelector('#funFact').value);
  let count = 0;
  for (let i = 0; i < textArea.length; i++) {
    let char = textArea[i];
    if (/[a-zA-Z]/.test(char)) {
      count++;
    }
  }

  if (count < 100) {
    dataValidator(document.querySelector('#funFact'), 100 - count);
  } else if (count >= 100) {
    document.querySelector('#funFactCounter').innerText = '';
    document.querySelector('#funFact').classList.remove('incorrect-data');
  }
});
