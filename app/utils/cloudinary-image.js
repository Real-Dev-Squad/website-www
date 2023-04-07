const DEFAULT_IMAGE = 'default_image_url';

const imageUrl = (publicId = DEFAULT_IMAGE, x = 200, y = 200) => {
  return `https://res.cloudinary.com/realdevsquad/image/upload/w_${x},h_${y}/${publicId}`;
};

export { imageUrl };
