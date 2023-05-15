const mapSection = document.getElementById('section-map');
const params = new URLSearchParams(window.location.search);
let showMap = false;
if (params.get('map') === 'true') {
  showMap = true;
}
