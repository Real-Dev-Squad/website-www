const instructionButton = document.querySelector('#instruction-button');
const closeButton = document.querySelector('.close');
const instructionModal = document.querySelector('.instruction-modal');
const overlay = document.querySelector('.overlay');
const mobileScreen = window.matchMedia('(max-width: 480px)');

const submitArtForm = document.querySelector('#submit-art-form');
const sanitizeOutputCode = document.getElementById('output');
let htmlCode;

const sanitizeHtml = (str) => {
  str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
};

const creatingArtFromHtml = () => {
  htmlCode = document.getElementById('html-code').value.trim();
  const sanitizedHtmlCode = `<div></div> <style> div { ${sanitizeHtml(
    htmlCode,
  )} } </style>`;

  sanitizeOutputCode.setAttribute('html-code', sanitizedHtmlCode);
  sanitizeOutputCode.contentDocument.body.innerHTML = sanitizedHtmlCode;
};

document
  .querySelector('#html-code')
  .addEventListener('keyup', creatingArtFromHtml);

submitArtForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let artTitle = submitArtForm.artTitle.value.trim();

  let artDetails = {
    title: submitArtForm.artTitle.value,
    css: htmlCode,
    price: Number(submitArtForm.artPrice.value),
  };

  if (artTitle && htmlCode) {
    fetch('http://localhost:3000/arts/user/add', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(artDetails),
    })
      .then((response) => response.json())
      .then(() => {
        submitArtForm.reset();
        sanitizeOutputCode.removeAttribute('html-code');
        sanitizeOutputCode.contentDocument.body.innerHTML = '';

        alert('Art added to the gallery!');
      });
  } else {
    alert('Input(s) cannot be empty.');
  }
});

instructionButton.onclick = () => {
  instructionModal.style.display = overlay.style.display = 'block';
  document.querySelector('body').style.overflow = 'hidden';
  if (mobileScreen.matches) {
    instructionModal.style.height = '70%';
  }
};

closeButton.onclick = () => {
  instructionModal.style.display = overlay.style.display = 'none';
  document.querySelector('body').style.overflow = 'auto';
};

window.onclick = (event) => {
  if (event.target === overlay) {
    instructionModal.style.display = overlay.style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
  }
};
