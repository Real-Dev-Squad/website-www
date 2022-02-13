const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/artFeature.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'artBundle.js',
  },
  watch: true,
};
