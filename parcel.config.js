const Bundler = require('parcel-bundler');
const file = 'public/js/index.js';

const options = {
  outDir: 'public/dist/',
  outFile: 'bundle',
  watch: true
};
module.exports = {file, options};
