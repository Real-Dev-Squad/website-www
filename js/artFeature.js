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

const instructionButton = document.getElementById('instruction-button');
const closeButton = document.getElementsByClassName('close')[0];
const instructionModal = document.getElementById('instruction-modal');

instructionButton.onclick = () => (instructionModal.style.display = 'block');
closeButton.onclick = () => (instructionModal.style.display = 'none');
window.onclick = (event) => {
  if (event.target === instructionModal) {
    instructionModal.style.display = 'none';
  }
};
