// This SystemJS fake config allows to web storm resolve aliases that are used from webpack

const helpers = require('./helpers');

System.config({
  '@grid/src': helpers.root('src'),
  '@grid/core': helpers.root('src/core'),
  '@grid/view': helpers.root('src/view'),
  '@grid/theme': helpers.root('src/themes/material'),
  '@grid/assets': helpers.root('src/assets')
});
