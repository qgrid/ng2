'use strict';
const { buildLib, buildTheme, serveApp, watchTheme } = require('./build.kit');
const cmdArgs = require('command-line-args');

const { prod } = cmdArgs([{
  name: 'prod',
  type: Boolean,
  defaultValue: false
}]);

const libOptions = ['--watch'];
const serveOptions = [];
if (prod) {
  libOptions.push('--prod');
  serveOptions.push('--prod');
}

async function main() {
  watchTheme('ng2-qgrid-theme-basic');
  watchTheme('ng2-qgrid-theme-material');

  serveApp(serveOptions);
}

main();
