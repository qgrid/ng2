'use strict';

const path = require('path');
const { buildLib, buildTheme } = require('./build.kit');
const { relativeCopy } = require('./build.utils');

const ROOT_PATH = path.resolve('.');
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const PROJECTS_PATH = path.join(ROOT_PATH, 'projects'); 
const CORE_PATH = path.join(PROJECTS_PATH, 'qgrid-core');
const PLUGINS_PATH = path.join(PROJECTS_PATH, 'qgrid-plugins');
const NG2QGRID_PATH = path.join(DIST_PATH, 'ng2-qgrid'); 
const QGRID_PATH = path.join(NG2QGRID_PATH, '@qgrid');
const QGRID_CORE_PATH = path.join(QGRID_PATH, 'core');
const QGRID_PLUGINS_PATH = path.join(QGRID_PATH, 'plugins');

const OPTIONS = ['--prod'];

async function main() {
  // await buildLib('ngx-qgrid', OPTIONS);
  // await buildLib('ngx-qgrid-plugins', OPTIONS);
  // await buildLib('ng2-qgrid', OPTIONS);

  // buildTheme('ng2-qgrid-theme-basic');
  // await buildLib('ng2-qgrid-theme-basic', OPTIONS);

  // buildTheme('ng2-qgrid-theme-material');
  // await buildLib('ng2-qgrid-theme-material', OPTIONS);

  relativeCopy('**/*.d.ts', CORE_PATH, QGRID_CORE_PATH);
  relativeCopy('**/*.d.ts', PLUGINS_PATH, QGRID_PLUGINS_PATH);
}

main();
