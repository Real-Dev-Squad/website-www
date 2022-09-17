const joinSection = document.getElementById('section-join');
const params = new URLSearchParams(window.location.search);
if (params.get('join') === 'true') {
  joinSection.classList.remove('hide');
}
