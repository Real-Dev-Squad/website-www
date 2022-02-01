const scrollToTopBtn = document.querySelector('#scrollToTopBtn');

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
