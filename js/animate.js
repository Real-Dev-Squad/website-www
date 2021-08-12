const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const randomNumberWithinRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const fetchX = (n) => {
  const deg = n * ((360 / numOfMembers) * (Math.PI / 180));
  return (width / 5) * Math.cos(deg);
};

const fetchY = (n) => {
  const deg = n * ((360 / numOfMembers) * (Math.PI / 180));
  return 160 * Math.sin(deg);
};

const memberList = document.querySelectorAll('.member_animation');

const handleIntersection = (entries) => {
  entries.forEach(({ isIntersecting }) => {
    isIntersecting ? addClassName() : removeClassName();
  });
};

const userViewport = document.querySelector('#members');
const observer = new IntersectionObserver(handleIntersection);
observer.observe(userViewport);

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
  if (width > 500)
    member.style.setProperty(
      '--s',
      `${randomNumberWithinRange(0.3, 0.7) * (width / (125 * numOfMembers))}`,
    );
  else
    member.style.setProperty(
      '--s',
      `${randomNumberWithinRange(0.3, 0.7) * (width / (60 * numOfMembers))}`,
    );
});