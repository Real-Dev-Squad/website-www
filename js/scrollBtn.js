const scrollToTopBtn = document.querySelector("#scroll-to-top-btn");

scrollToTopBtn.addEventListener("click", function(){
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
})