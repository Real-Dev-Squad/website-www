import { BASE_URL, SELF_URL} from './constants.js';

//fetch API DATA template
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
    console.error(err);
    throw err;
  }
}


//fetching userId
async function fetchSavedDetails(page){
  try {
    const usersRequest = await makeApiCall(
      `${SELF_URL}`,
    );
    let usersDataList;
    usersDataList = await usersRequest.json();
    return usersDataList.id;
  }catch (err) {
    throw err;
  }
}

//generate form and render information
async function generateSavedDetailsForm(users){
  console.log(users)
  let renderPage = document.createElement("section");
  renderPage.className = 'render-page';
  renderPage.setAttribute('id', 'render-page');

  let greeting = document.createElement("h1");
  greeting.className = 'greeting';
  greeting.innerText = "Thanks for filling out 👀 Here's what was received."
  renderPage.appendChild(greeting);

  let container = document.createElement("div");
  container.className = 'container';
  renderPage.appendChild(container);

  let firstName = document.createElement('p');
  firstName.className = "input-label-dark";
  firstName.innerText = "First Name";
  let renderFirstName = document.createElement('p');
  renderFirstName.className = 'user-input input-regular';
  renderFirstName.setAttribute('id', 'renderFName');
  renderFirstName.innerText = users.firstName;
  container.appendChild(firstName);
  container.appendChild(renderFirstName);

  let lastName = document.createElement('p');
  lastName.className = "input-label-dark";
  lastName.innerText = 'Last Name';
  let renderLastName = document.createElement('p');
  renderLastName.className = 'user-input input-regular';
  renderLastName.setAttribute('id', 'renderLName');
  renderLastName.innerHTML = users.lastName;
  container.appendChild(lastName);
  container.appendChild(renderLastName);

  let yourCity = document.createElement('p');
  yourCity.className = "input-label-dark";
  yourCity.innerText = 'Your City';
  let renderCity = document.createElement('p');
  renderCity.className = 'user-input input-regular';
  renderCity.setAttribute('id', 'renderCity');
  renderCity.innerHTML = users.city;
  container.appendChild(yourCity);
  container.appendChild(renderCity);

  let yourState = document.createElement('p');
  yourState.className = "input-label-dark";
  yourState.innerText = 'Your State';
  let renderState = document.createElement('p');
  renderState.className = 'user-input input-regular';
  renderState.setAttribute('id', 'renderState');
  renderState.innerHTML = users.state;
  container.appendChild(yourState);
  container.appendChild(renderState);

  let yourCountry = document.createElement('p');
  yourCountry.className = "input-label-dark";
  yourCountry.innerText = 'Your Country';
  let renderCountry = document.createElement('p');
  renderCountry.className = 'user-input input-regular';
  renderCountry.setAttribute('id', 'renderCountry');
  renderCountry.innerHTML = users.country;
  container.appendChild(yourCountry);
  container.appendChild(renderCountry);

  let yourIntroduction = document.createElement('p');
  yourIntroduction.className = "input-label-dark";
  yourIntroduction.innerText = 'Your Introduction';
  let renderIntro = document.createElement('p');
  renderIntro.className = 'user-input input-big';
  renderIntro.setAttribute('id', 'renderIntro');
  renderIntro.innerHTML = users.introduction;
  container.appendChild(yourIntroduction);
  container.appendChild(renderIntro);

  let yourSkills = document.createElement('p');
  yourSkills.className = "input-label-dark";
  yourSkills.innerText = 'Your Skills';
  let renderSkills = document.createElement('p');
  renderSkills.className = 'user-input input-regular';
  renderSkills.setAttribute('id', 'renderSkills');
  renderSkills.innerHTML = users.skills;
  container.appendChild(yourSkills);
  container.appendChild(renderSkills);

  let yourInstitution = document.createElement('p');
  yourInstitution.className = "input-label-dark";
  yourInstitution.innerText = 'Your Institution';
  let renderInstitution = document.createElement('p');
  renderInstitution.className = 'user-input input-regular';
  renderInstitution.setAttribute('id', 'renderInstitution');
  renderInstitution.innerHTML = users.institution;
  container.appendChild(yourInstitution);
  container.appendChild(renderInstitution);

  let forFun = document.createElement('p');
  forFun.className = "input-label-dark";
  forFun.innerText = 'What you do for fun';
  let renderForFun = document.createElement('p');
  renderForFun.className = 'user-input input-big';
  renderForFun.setAttribute('id', 'renderForFun');
  renderForFun.innerHTML = users.forFun;
  container.appendChild(forFun);
  container.appendChild(renderForFun);

  let funFact = document.createElement('p');
  funFact.className = "input-label-dark";
  funFact.innerText = 'A fun fact about you';
  let renderFunFact = document.createElement('p');
  renderFunFact.className = 'user-input input-big';
  renderFunFact.setAttribute('id', 'renderFunFact');
  renderFunFact.innerHTML = users.funFact;
  container.appendChild(funFact);
  container.appendChild(renderFunFact);

  let whyRds = document.createElement('p');
  whyRds.className = "input-label-dark";
  whyRds.innerText = 'Why do you want to join Real Dev Squad?';
  let renderWhyRds = document.createElement('p');
  renderWhyRds.className = 'user-input input-big';
  renderWhyRds.setAttribute('id', 'renderWhyRds');
  renderWhyRds.innerHTML = users.whyRds;
  container.appendChild(whyRds);
  container.appendChild(renderWhyRds);

  let heardAbout = document.createElement('p');
  heardAbout.className = "input-label-dark";
  heardAbout.innerText = 'How did you hear about us';
  let renderHeardAbout = document.createElement('p');
  renderHeardAbout.className = 'user-input input-regular';
  renderHeardAbout.setAttribute('id', 'renderHeardAbout');
  renderHeardAbout.innerHTML = users.foundFrom;
  container.appendChild(heardAbout);
  container.appendChild(renderHeardAbout);
  document.querySelector('.intro-main').appendChild(renderPage)
}


//making userSavedData object from API
async function showSavedDetails(){
  try {
    const id = await fetchSavedDetails();
    const usersRequest = await makeApiCall(
      `${BASE_URL}/users/${id}/intro`,
    );
    let usersData = await usersRequest.json();
    console.log(usersData)
    let userSavedData = {
      firstName: usersData.data[0].biodata.firstName,
      lastName: usersData.data[0].biodata.lastName,
      city: usersData.data[0].location.city,
      state: usersData.data[0].location.state,
      country: usersData.data[0].location.country,
      introduction: usersData.data[0].intro.introduction,
      skills: usersData.data[0].professional.skills,
      institution: usersData.data[0].professional.institution,
      funFact: usersData.data[0].intro.funFact,
      forFun: usersData.data[0].intro.forFun,
      whyRds: usersData.data[0].intro.whyRds,
      foundFrom:usersData.data[0].foundFrom
    };
    console.log(userSavedData);

    generateSavedDetailsForm(userSavedData);
  }
  catch (err) {
    console.error(err);
  };
}

window.onload = function (){
  showSavedDetails()
}


