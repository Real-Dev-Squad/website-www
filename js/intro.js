import { BASE_URL, SELF_URL } from './constants.js';

fetchSavedDetails();

const renderFName = document.getElementById('renderFName');
const renderLName = document.getElementById('renderLName');
const renderCity = document.getElementById('renderCity');
const renderState = document.getElementById('renderState');
const renderCountry = document.getElementById('renderCountry');
const renderIntro = document.getElementById('renderIntro');
const renderSkills = document.getElementById('renderSkills');
const renderInstitution = document.getElementById('renderInstitution');
const renderFunFact = document.getElementById('renderFunFact');
const renderForFun = document.getElementById('renderForFun');
const renderWhyRds = document.getElementById('renderWhyRds');
const renderHeardAbout = document.getElementById('renderHeardAbout');

let url;
let first_name;
let last_name;

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
      console.log(res);
      first_name = res.first_name;
      last_name = res.last_name;
      url = `${BASE_URL}/users/${res.id}/intro`;
      console.log(url);
      fetchIntroDetails(url, first_name, last_name);
    })
    .catch((err) => {
      alert(
        'We are facing an internal server error! Please try again after some time',
      );
      location.href = 'https://realdevsquad.com';
    });
}

function fetchIntroDetails(url, first_name, last_name) {
  fetch(`${url}`, {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data);
      renderFName.innerText = first_name;
      renderLName.innerHTML = last_name;
      renderCity.innerHTML = res.data[0].location.city;
      renderState.innerHTML = res.data[0].location.state;
      renderCountry.innerHTML = res.data[0].location.country;
      renderIntro.innerHTML = res.data[0].intro.introduction;
      renderSkills.innerHTML = res.data[0].professional.skills;
      renderInstitution.innerHTML = res.data[0].professional.institution;
      renderForFun.innerHTML = res.data[0].intro.forFun;
      renderFunFact.innerHTML = res.data[0].intro.funFact;
      renderWhyRds.innerHTML = res.data[0].intro.whyRds;
      renderHeardAbout.innerHTML = res.data[0].foundFrom;
    })
    .catch((err) => {
      alert(
        'We are facing an internal server error! Please try again after some time',
      );
      location.href = 'https://realdevsquad.com';
    });
}
