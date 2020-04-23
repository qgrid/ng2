'use strict';

const path = require('path');
const { fixImports } = require('./build.import');
const { buildLib, buildTheme } = require('./build.kit');
const { relativeCopy } = require('./build.utils');

const ROOT_PATH = path.resolve('.');
const PROJECTS_PATH = path.join(ROOT_PATH, 'projects');

const NG2_QGRID_PATH = path.join(PROJECTS_PATH, 'ng2-qgrid', 'src');
const NGX_QGRID_PATH = path.join(PROJECTS_PATH, 'ngx-qgrid', 'src');
const NGX_QGRID_PLUGINS_PATH = path.join(PROJECTS_PATH, 'ngx-qgrid-plugins', 'src');
const CORE_PATH = path.join(PROJECTS_PATH, 'qgrid-core');
const PLUGINS_PATH = path.join(PROJECTS_PATH, 'qgrid-plugins');
const ASSETS_PATH = path.join(PROJECTS_PATH, 'assets');

const NG2_QGRID_PATH_DEPS = path.join(NG2_QGRID_PATH, '@qgrid');
const NG2_QGRID_CORE_PATH = path.join(NG2_QGRID_PATH_DEPS, 'core');
const NG2_QGRID_PLUGINS_PATH = path.join(NG2_QGRID_PATH_DEPS, 'plugins');
const NG2_QGRID_NGX_PATH = path.join(NG2_QGRID_PATH_DEPS, 'ngx');
const NG2_QGRID_NGX_PLUGINS_PATH = path.join(NG2_QGRID_PATH_DEPS, 'ngx-plugins');
const NG2_QGRID_ASSETS_PATH = path.join(NG2_QGRID_PATH, 'assets');

const OPTIONS = ['--prod'];

async function main() {
  await relativeCopy('**/*', CORE_PATH, NG2_QGRID_CORE_PATH);
  await relativeCopy('**/*', PLUGINS_PATH, NG2_QGRID_PLUGINS_PATH);
  await relativeCopy('**/*', NGX_QGRID_PATH, NG2_QGRID_NGX_PATH);
  await relativeCopy('**/*', NGX_QGRID_PLUGINS_PATH, NG2_QGRID_NGX_PLUGINS_PATH);
  await relativeCopy('**/*', ASSETS_PATH, NG2_QGRID_ASSETS_PATH);

  await fixImports(NG2_QGRID_PATH);

  await buildLib('ng2-qgrid', OPTIONS);

  buildTheme('ng2-qgrid-theme-basic');
  await buildLib('ng2-qgrid-theme-basic', OPTIONS);

  buildTheme('ng2-qgrid-theme-material');
  await buildLib('ng2-qgrid-theme-material', OPTIONS);
}

main();
