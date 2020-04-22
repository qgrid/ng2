'use strict';
const { buildLib, buildTheme, serveApp } = require('./build.kit');
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
  await buildLib('ngx-qgrid', libOptions);
  await buildLib('ngx-qgrid-plugins', libOptions);
  await buildLib('ng2-qgrid', libOptions);

  buildTheme('ng2-qgrid-theme-basic');
  await buildLib('ng2-qgrid-theme-basic', libOptions);

  buildTheme('ng2-qgrid-theme-material');
  await buildLib('ng2-qgrid-theme-material', libOptions);

  watchTheme('ng2-qgrid-theme-basic');
  watchTheme('ng2-qgrid-theme-material');

  serveApp(serveOptions);
}

main();
