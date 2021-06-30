const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
const responsiveConstant = width / (height * 2.3);

const randomNumberWithinRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const fetchX = (n) => {
  const deg = n * (72 * (Math.PI / 180));
  return (width / 5) * Math.cos(deg);
};

const fetchY = (n) => {
  const deg = n * (72 * (Math.PI / 180));
  return 160 * Math.sin(deg);
};

const memberList = document.querySelectorAll('.member_animation');

const addClassName = () => {
  let n = 0;
  memberList.forEach((member) => {
    member.style.setProperty('--x', `${fetchX(n)}%`);
    member.style.setProperty('--y', `${fetchY(n)}%`);
    member.classList = 'member-img member_animation';
    n += 1;
  });
};

const removeClassName = () => {
  memberList.forEach((member) => {
    member.classList = 'member-img reverse_animation';
  });
};

memberList.forEach((member) => {
  member.style.setProperty(
    '--s',
    `${randomNumberWithinRange(0.1, 0.6) * responsiveConstant + 0.9}`,
  );
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
