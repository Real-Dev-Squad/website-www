const form = document.getElementById('form');
const username = document.getElementById('username');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const yoe = document.getElementById('yoe');
const company = document.getElementById('company');
const designation = document.getElementById('designation');
const github_id = document.getElementById('github_id');
const linkedin_id = document.getElementById('linkedin_id');
const twitter_id = document.getElementById('twitter_id');
const btn = document.getElementById('submission');

//Error Handler
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const small = formGroup.querySelector('small');
  small.innerText = message;
}

//Success Handler
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

// Username Validator
function checkUsername(input) {
  //Check presence of first_name
  if (!input.value.trim().startsWith(first_name.value.toLowerCase())) {
    showError(
      username,
      'Username must start with first name. Usage of funky words should be avoided.'
    );
  } else {
    showSuccess(username);
  }

  //Check if username pertains to the appropriate format
  let pattern = new RegExp(/^[a-zA-Z-]+$/g);
  if (pattern.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(
      username,
      'Only alphabets and "-" are allowed. Numbers are prohibited.'
    );
  }
}

//Email Validator
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

//Phone Validator
function checkPhone(input) {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Phone number is not valid');
  }
}

//Input fields validator
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, 'Field cannot be empty.');
      btn.disabled = true;
    } else {
      showSuccess(input);
      btn.disabled = false;
      btn.style.opacity = 1;
    }
  });
}

//Form submission handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkUsername(username);
  checkEmail(email);
  checkPhone(phone);
  checkRequired([
    username,
    first_name,
    last_name,
    yoe,
    company,
    designation,
    github_id,
    linkedin_id,
  ]);

  updateUserData();
});

let id;
const getUser = async () => {
  try {
    let res = await fetch(`https://staging-api.realdevsquad.com/users/self`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    id = data.id;
    return id;
  } catch (error) {
    console.error(error);
  }
};

const updateUserData = async () => {
  try {
    let res = await fetch(`https://staging-api.realdevsquad.com/users/${id}`, {
      method: 'PATCH',
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
