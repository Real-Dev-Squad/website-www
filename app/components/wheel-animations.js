import Component from '@glimmer/component';

export default class WheelAnimationsComponent extends Component {
  // TODO: fix random generating values for x, y and size for proper animation
  randomNumber = () => {
    const x = 10;
    const y = 10;

    const randomNumber = (Math.random() * (y + x) - x) * 20;
    return randomNumber;
  };

  randomSize = () => {
    const x = 0.7;
    const y = 1.3;

    const randomNumber = Math.random() * (y + x) - x;
    return randomNumber;
  };

  //   TODO:  MAKE this into util
  resizeImageUrl = (publicId, x, y) => {
    if (publicId) {
      return `https://res.cloudinary.com/realdevsquad/image/upload/w_${x},h_${y}/${publicId}`;
    }
    // SET DEFAULT dummy image
    return 'DEFAULT';
  };
}
