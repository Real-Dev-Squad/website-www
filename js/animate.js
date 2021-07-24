const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

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
  member.style.setProperty('--s', `${randomNumberWithinRange(0.9, 1.8)}`);
});

const handleIntersection = (entries) => {
  entries.forEach(({ isIntersecting }) => {
    if (isIntersecting) addClassName();
    else removeClassName();
  });
};

const userViewport = document.querySelector('#members');
const observer = new IntersectionObserver(handleIntersection);
observer.observe(userViewport);
