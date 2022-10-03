const joinSection = document.getElementById('section-join');
const mapSection = document.getElementById('section-map');
const params = new URLSearchParams(window.location.search);
let showMap = false;
if (params.get('join') === 'true') {
  joinSection.classList.remove('hide');
}
if (params.get('map') === 'true') {
  showMap = true;
}
