const form = document.getElementById('form');
const username = document.getElementById('username');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
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
  if (!username.value.trim().startsWith(first_name.value.toLowerCase())) {
    showError(
      username,
      'Username should start with your first name. Please avoid using funky words as suffix'
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

form.addEventListener('keypress', (e) => {
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
});

//Form submission handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkUsername(username);
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

const id = username.value;
const updateUserData = async () => {
  try {
    let res = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PATCH',
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
