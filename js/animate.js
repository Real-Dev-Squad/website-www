const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
const constant = width / (height * 2.3);

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const fetchx = (n) => {
  const deg = n * (72 * (Math.PI / 180));
  return (width / 5) * Math.cos(deg);
};

const fetchy = (n) => {
  const deg = n * (72 * (Math.PI / 180));
  return 160 * Math.sin(deg);
};

const arr = document.querySelectorAll('.member_animation');

const addClassName = () => {
  let n = 0;
  arr.forEach((ele) => {
    ele.style.setProperty('--x', `${fetchx(n)}%`);
    ele.style.setProperty('--y', `${fetchy(n)}%`);
    ele.classList = 'member-img member_animation';
    n += 1;
  });
};

const removeClassName = () => {
  arr.forEach((ele) => {
    ele.classList = 'member-img reverse_animation';
  });
};

arr.forEach((ele) => {
  ele.style.setProperty('--s', `${randomNumber(0.1, 0.6) * constant + 0.9}`);
});

window.addEventListener('scroll', () => {
  let show = false;
  if (!show && window.scrollY > height * 0.8 && window.scrollY < height * 1.8) {
    show = true;
    addClassName();
  } else {
    removeClassName();
    show = false;
  }
});
