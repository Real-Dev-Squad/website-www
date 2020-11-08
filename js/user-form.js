const USERNAME = 'username';
const FIRST_NAME = 'first_name';
const LAST_NAME = 'last_name';
const EMAIL = 'email';
const PHONE = 'phone';
const YOE = 'yoe';
const COMPANY = 'company';
const DESIGNATION = 'designation';
const GITHUB_ID = 'github_id';
const LINKEDIN_ID = 'linkedin_id';
const TWITTER_ID = 'twitter_id';
const PROFILE_PIC = 'profile_pic';

function getElementsForKeys (arrKeys) {
  return arrKeys.map(function(k) {
    return document.getElementById(k);
  });
}

const form = document.getElementById('form');
const btn = document.getElementById('submission');

// Error Handler
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const small = formGroup.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

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

  // Check if username pertains to the appropriate format
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

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkPhone(input) {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Phone number is not valid');
  }
}

//Input fields validator
function checkRequired(inputKeys) {
  const arrEls = getElementsForKeys(inputKeys);
  arrEls.forEach((input) => {
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

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkUsername(username);
  checkEmail(email);
  checkPhone(phone);
  checkRequired([
    USERNAME,
    FIRST_NAME,
    LAST_NAME,
    YOE,
    COMPANY,
    DESIGNATION,
    GITHUB_ID,
    LINKEDIN_ID,
    TWITTER_ID,
    PROFILE_PIC
  ]);

  updateUserData();
});

function getDataToSend (arrKeys) {
  return arrKeys.reduce(function(acc, k) {
    const el = document.getElementById(k);

    if(el && el.tagName === 'INPUT') {
      acc[k] = el.value;
    }
    return acc;
  }, {})
}

const updateUserData = async () => {
  
  const dataToSend = getDataToSend([
    USERNAME,
    FIRST_NAME,
    LAST_NAME,
    YOE,
    COMPANY,
    DESIGNATION,
    GITHUB_ID,
    LINKEDIN_ID,
    TWITTER_ID,
  ]);

  try {
    const res = await fetch('https://staging-api.realdevsquad.com/users/self', {
      method: 'PATCH',
      credentials: 'include',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(dataToSend)
    });

    if(res.status === 204) {
      window.location.replace('/goto');
    }
    else {
      console.error(res);
    }

  } catch (err) {
    console.log(err);
  }
};
