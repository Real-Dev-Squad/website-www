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

let fields = [
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

//This function updates all the data fields based on the the response we got from the api call,
//such that field exits of
const handleViewUserDetails = async (result) => {
  fields.forEach((field) => {
    switch (field.className) {
      case 'fullname':
        field.innerText =
          result.first_name[0].toUpperCase() +
          result.first_name.slice(1) +
          result.last_name[0].toUpperCase() +
          result.last_name.slice(1);
        break;
      case 'img-holder':
        field.src = result.picture.url;
        break;
      case 'all-roles':
        for (let role in result.roles) {
          let content = `<p class="roles"><b>${role} :</b> <span>${result.roles[role]}</span></p>`;
          field.innerHTML = field.innerHTML + content;
        }
        break;
      case 'indicator':
        if (result.roles.super_user) {
          field.style.backgroundColor = 'var(--color-vivid-green)';
          msg.innerText =
            "You're a super user, remember with great power comes great responsibilities!";
        } else {
          toggle.classList.add('disabled');
          toggleButton.classList.add('disabled');
          field.style.backgroundColor = 'var(--color-firebrick)';
          msg.innerText = "You're not a super user!";
        }
        break;
      default:
        field.innerText = result[field.className];
        break;
    }
  });
};

const setPrivileges = (mode) => {
  localStorage.setItem('localSuperUserPrivilege', mode);
};

// This fetch data form **/users/self**
const fetchUserDetails = async () => {
  const res = await fetch(`${SELF_URL}`, {
    credentials: 'include',
  });
  const result = await res.json();
  return result;
};

fetchUserDetails().then((result) => handleViewUserDetails(result));

//mode can either be 'applied' or 'revoked'
function showPopUp(message, mode) {
  popUp.style.backgroundColor =
    mode === 'applied' ? 'var(--color-lime-green)' : 'var(--color-firebrick)';
  popUp.children[0].innerText = message;
  popUp.classList.add('show-popup-animattion');
  setTimeout(() => {
    popUp.style.backgroundColor = 'none';
    popUp.classList.remove('show-popup-animattion');
  }, 800);
}

//TOGGLE
let currToggleState = false;
function handleToggle(e) {
  fetchUserDetails().then((result) => {
    if ('super_user' in result.roles) {
      if (!currToggleState) {
        currToggleState = !currToggleState;
        toggle.classList.toggle('applied');
        toggleButton.style.backgroundColor = 'var(--color-vivid-green)';
        showPopUp('Your privilege are applied', 'applied');
        setPrivileges(true);
      } else {
        currToggleState = !currToggleState;
        toggleButton.style.backgroundColor = 'var(--color-firebrick)';
        toggle.classList.toggle('applied');
        showPopUp('Your privilege are revoked');
        setPrivileges(false);
      }
    }
  });
}

//eventhandleer is on the button and not the toggler due to eventPropogation
toggleButton.addEventListener('click', handleToggle);
