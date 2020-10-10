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

  /**Check if username pertains to the appropriate format
   ** Validation partially incorrect - doesn't fail when digits are present 
   **/
  let pattern = new RegExp(/^[0-9!@#\$%\^\&*\)\(+=._]+$/g);
  if (pattern.test(input.value.trim())) {
    showError(
      username,
      'Only Hyphen "-" as a special character is allowed & using Numbers is also prohibited.'
    );
  } else {
    showSuccess(input);
  }
}

//Input fields validator
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, 'Field cannot be empty.');
    } else {
      showSuccess(input);
    }
  });
}

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
    twitter_id,
  ]);
});
