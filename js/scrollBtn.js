const scrollToTopBtn = document.querySelector('#scroll-to-top-btn');

window.onscroll = () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollToTopBtn.style.bottom = '20px';
  } else {
    scrollToTopBtn.style.bottom = '-100px';
  }
};

scrollToTopBtn.addEventListener('click', function () {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
