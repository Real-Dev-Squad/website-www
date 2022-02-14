const instructionButton = document.querySelector('#instruction-button');
const closeButton = document.querySelector('.close');
const instructionModal = document.querySelector('.instruction-modal');
const overlay = document.querySelector('.overlay');
const mobileScreen = window.matchMedia('(max-width: 480px)');

const sanitizeHtml = (str) => {
  if (str === null || str === '') return false;
  str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
};

const creatingArtFromHtml = () => {
  const htmlCode = document.getElementById('html-code').value;
  const sanitizedHtmlCode = `<div></div> <style> div { ${sanitizeHtml(
    htmlCode,
  )} } </style>`;
  const sanitizeOutputCode = document.getElementById('output');
  sanitizeOutputCode.setAttribute('html-code', sanitizedHtmlCode);
  sanitizeOutputCode.contentDocument.body.innerHTML = sanitizedHtmlCode;
};

document
  .querySelector('#html-code')
  .addEventListener('keyup', creatingArtFromHtml);

instructionButton.onclick = () => {
  instructionModal.style.display = overlay.style.display = 'block';
  document.querySelector('body').style.overflow = 'hidden';
  if (mobileScreen.matches) {
    instructionModal.style.height = '350px';
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
