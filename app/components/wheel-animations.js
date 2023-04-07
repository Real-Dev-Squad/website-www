import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { imageUrl } from '../utils/cloudinary-image';

const width = document.body.clientWidth;
const noOfMembers = 5;

export default class WheelAnimationsComponent extends Component {
  resizeImageUrl = imageUrl;

  memberStyle = (index) => {
    let style = `
      --size: ${randomNumberWithinRange(0.5, 1.2)};
      --x: ${randomX(index)};
      --y: ${randomY(index)};
    }
    `;
    return htmlSafe(style);
  };
}

function randomX(n) {
  const deg = n * (360 / noOfMembers) * (Math.PI / 180);
  return (width / 5) * Math.cos(deg);
}

function randomY(n) {
  const deg = n * (360 / noOfMembers) * (Math.PI / 180);
  return 180 * Math.sin(deg);
}

function randomNumberWithinRange(min, max) {
  return Math.random() * (max - min) + min;
}

export { randomNumberWithinRange, randomX, randomY };
