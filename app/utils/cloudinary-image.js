const DEFAULT_IMAGE = 'assets/images/profile.png';

const imageUrl = (publicId, x = 200, y = 200) => {
  return publicId
    ? `https://res.cloudinary.com/realdevsquad/image/upload/w_${x},h_${y}/${publicId}`
    : DEFAULT_IMAGE;
};

export { imageUrl };
