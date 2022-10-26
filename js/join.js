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
  college: 5,
  introduction: 100,
  whyRds: 100,
  forFun: 100,
  funFact: 100,
  foundFrom: 1,
};

let url;
const postUrl = 'https://api.realdevsquad.com/users/self/intro';

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

const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas (the)',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia (Plurinational State of)',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory (the)',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cayman Islands (the)',
  'Central African Republic (the)',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands (the)',
  'Colombia',
  'Comoros (the)',
  'Congo (the Democratic Republic of the)',
  'Congo (the)',
  'Cook Islands (the)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czechia',
  "Côte d'Ivoire",
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic (the)',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Falkland Islands (the) [Malvinas]',
  'Faroe Islands (the)',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories (the)',
  'Gabon',
  'Gambia (the)',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Holy See (the)',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran (Islamic Republic of)',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Korea (the Democratic People's Republic of)",
  'Korea (the Republic of)',
  'Kuwait',
  'Kyrgyzstan',
  "Lao People's Democratic Republic (the)",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands (the)',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia (Federated States of)',
  'Moldova (the Republic of)',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands (the)',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger (the)',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands (the)',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine, State of',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines (the)',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Republic of North Macedonia',
  'Romania',
  'Russian Federation (the)',
  'Rwanda',
  'Réunion',
  'Saint Barthélemy',
  'Saint Helena, Ascension and Tristan da Cunha',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin (French part)',
  'Saint Pierre and Miquelon',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten (Dutch part)',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and the South Sandwich Islands',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan (the)',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan',
  'Tajikistan',
  'Tanzania, United Republic of',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands (the)',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates (the)',
  'United Kingdom of Great Britain and Northern Ireland (the)',
  'United States Minor Outlying Islands (the)',
  'United States of America (the)',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela (Bolivarian Republic of)',
  'Viet Nam',
  'Virgin Islands (British)',
  'Virgin Islands (U.S.)',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
  'Åland Islands',
];

// variables for personal details Page
const city = document.getElementById('city');
const state = document.getElementById('state');
const country = document.getElementById('country');
const next1 = document.getElementById('next1');
const previous1 = document.getElementById('previous1');
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
const previous2 = document.getElementById('previous2');

//variables for why RDS Page
const whyRds = document.getElementById('whyRds');
const foundFrom = document.getElementById('foundFrom');
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

function fetchSavedDetails() {
  fetch('https://api.realdevsquad.com/users/self', {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      window.localStorage.setItem('firstName', res.first_name);
      window.localStorage.setItem('lastName', res.last_name);
      console.log(res);
      url = `https://api.realdevsquad.com/users/${res.id}/intro`;
      personalLink.innerText = url;
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
    country.value.trim().length >= 3
  );
}

function introPageValidator() {
  return (
    introduction.value.trim().split(' ').length >= 100 &&
    skills.value.trim().split(' ').length >= 5 &&
    college.value.trim().split(' ').length >= 5 &&
    forFun.value.trim().split(' ').length >= 100 &&
    funFact.value.trim().split(' ').length >= 100
  );
}

function whyRdsPageValidator() {
  return whyRds.value.trim().split(' ').length >= 100 && foundFrom.value != '';
}

function dataValidator(element, size) {
  let counter = document.getElementById(element.id + 'Counter');
  let words_left = size - element.value.trim().split(' ').length;
  counter.innerText = `${words_left} word(s) left for your data to be valid`;
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
  //dataValidator(field, sizeDef[field.id]);
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
  const data = JSON.stringify(localStorage);
  const method = 'POST';
  await fetch(postUrl, {
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
