//Global imports and Declarations

import { SELF_URL } from './constants.js';
let profilePic = document.querySelector('.img-holder');
let username = document.querySelector('.username');
let fullname = document.querySelector('.fullname');
let rdsId = document.querySelector('.id');
let discordJoinedAt = document.querySelector('.discordJoinedAt');
let github_display_name = document.querySelector('.github_display_name');
let incompleteUserDetails = document.querySelector('.incompleteUserDetails');
let all_roles = document.querySelector('.all-roles');
let twitter_id = document.querySelector('.twitter_id');
let github_id = document.querySelector('.github_id');
let linkedin_id = document.querySelector('.linkedin_id');
let discordId = document.querySelector('.discordId');
let toggleButton = document.querySelector('.toggle-button');
let toggle = document.querySelector('.toggle');
let indicator = document.querySelector('.indicator');
let msg = document.querySelector('.suMsg');
let popUp = document.querySelector('.pop-up');
let website = document.querySelector('.website');

let feilds = [
  profilePic,
  username,
  fullname,
  rdsId,
  discordJoinedAt,
  github_display_name,
  incompleteUserDetails,
  all_roles,
  twitter_id,
  github_id,
  linkedin_id,
  discordId,
  indicator,
  website,
];

//This function updates all the data feilds based on the the response we got from the api call,
//such that feild exits of
const handleViewUserDetails = async (result) => {
  feilds.forEach((feild) => {
    switch (feild.className) {
      case 'fullname':
        feild.innerText = (result.first_name + result.last_name).toUpperCase();
        break;
      case 'img-holder':
        feild.src = result.picture.url;
        break;
      case 'all-roles':
        for (let role in result.roles) {
          let content = `<p class="roles"><b>${role} :</b> <span>${result.roles[role]}</span></p>`;
          feild.innerHTML = feild.innerHTML + content;
        }
        break;
      case 'indicator':
        if (result.roles.super_user) {
          feild.style.backgroundColor = ' rgb(0, 255, 8)';
          msg.innerText =
            "You're a super user, remember with great power comes great responsibilities!";
        } else {
          toggle.classList.add('disabled');
          toggleButton.classList.add('disabled');
          feild.style.backgroundColor = 'rgb(255, 0, 43)';
          msg.innerText = "You're not a super user!";
        }
        break;
      default:
        feild.innerText = result[feild.className];
        break;
    }
  });
};

const setPrivileges = (mode) => {
  localStorage.setItem('localSuperUserPrivilege', mode);
};

// This fetch data form **/users/self**
const fetchUserDetails = async () => {
  const res = await fetch(`${SELF_URL}`, { credentials: 'include' });
  const result = await res.json();
  return result;
};

fetchUserDetails().then((result) => handleViewUserDetails(result));

//TOGGLE
let currToggleState = false;
function handleToggle(e) {
  if (!currToggleState) {
    currToggleState = !currToggleState;
    toggle.classList.toggle('applied');
    toggleButton.style.backgroundColor = 'rgb(0, 255, 8)';
    showPopUp('Your Priviledges are applied', 'applied');
    setPrivileges(true);
  } else {
    currToggleState = !currToggleState;
    toggleButton.style.backgroundColor = 'rgb(255, 0, 43)';
    toggle.classList.toggle('applied');
    showPopUp('Your Priviledges are revoked');
    setPrivileges(false);
  }
}

//mode can either be 'applied' or 'revoked'
function showPopUp(message, mode) {
  popUp.style.backgroundColor =
    mode === 'applied'
      ? 'rgba(32, 124, 35, 0.703)'
      : 'rgba(250, 59, 59, 0.923)';
  popUp.children[0].innerText = message;
  popUp.classList.add('show-popup-animattion');
  setTimeout(() => {
    popUp.style.backgroundColor = 'none';
    popUp.classList.remove('show-popup-animattion');
  }, 800);
}

//eventhandleer is on the button and not the toggler due to eventPropogation
toggleButton.addEventListener('click', handleToggle);
