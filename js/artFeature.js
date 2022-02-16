import { db } from './firebaseConfig';
const submitArtForm = document.querySelector('#submit-art-form');
const sanitizeOutputCode = document.getElementById('output');
let htmlCode;

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// collection ref
const colRef = collection(db, 'artworks');

const sanitizeHtml = (str) => {
  if (str === null || str === '') return false;
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

  if (artTitle && htmlCode) {
    addDoc(colRef, {
      title: submitArtForm.artTitle.value,
      css: htmlCode,
      price: submitArtForm.artPrice.value,
      createdAt: serverTimestamp(),
    }).then(() => {
      submitArtForm.reset();
      sanitizeOutputCode.removeAttribute('html-code');
      sanitizeOutputCode.contentDocument.body.innerHTML = '';

      alert('Art added to the gallery!');
    });
  } else {
    alert('Input(s) cannot be empty.');
  }
});
