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
    price: submitArtForm.artPrice.value,
  };

  if (artTitle && htmlCode) {
    fetch(`'endpoint for adding art'`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
