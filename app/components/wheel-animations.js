import Component from '@glimmer/component';

const width = document.body.clientWidth;
const noOfMembers = 5;
const theta = 360 / noOfMembers;

export default class WheelAnimationsComponent extends Component {
  randomX = (n) => {
    const deg = n * theta * (Math.PI / 180);
    return (width / 5) * Math.cos(deg);
  };

  randomY = (n) => {
    const deg = n * theta * (Math.PI / 180);
    return 180 * Math.sin(deg);
  };

  randomSize = () => {
    return randomNumberWithinRange(0.5, 1.2);
  };

  //   TODO:  MAKE this into util
  resizeImageUrl = (publicId, x, y) => {
    return `https://res.cloudinary.com/realdevsquad/image/upload/w_${x},h_${y}/${publicId}`;
  };
}

function randomNumberWithinRange(min, max) {
  return Math.random() * (max - min) + min;
}
