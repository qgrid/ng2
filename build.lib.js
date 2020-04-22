'use strict';

const path = require('path');
const { fixImports } = require('./build.import');
const { buildLib, buildTheme } = require('./build.kit');
const { relativeCopy } = require('./build.utils');

const ROOT_PATH = path.resolve('.');
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const DIST_NG2_QGRID_PATH = path.join(DIST_PATH, 'ng2-qgrid');
const DIST_NGX_QGRID_PATH = path.join(DIST_PATH, 'ngx-qgrid');
const DIST_NGX_QGRID_PLUGINS_PATH = path.join(DIST_PATH, 'ngx-qgrid-plugins');
const PROJECTS_PATH = path.join(ROOT_PATH, 'projects');
const CORE_PATH = path.join(PROJECTS_PATH, 'qgrid-core');
const PLUGINS_PATH = path.join(PROJECTS_PATH, 'qgrid-plugins');
const QGRID_PATH = path.join(DIST_NG2_QGRID_PATH, '@qgrid');
const QGRID_CORE_PATH = path.join(QGRID_PATH, 'core');
const QGRID_PLUGINS_PATH = path.join(QGRID_PATH, 'plugins');
const QGRID_NGX_PATH = path.join(QGRID_PATH, 'ngx');
const QGRID_NGX_PLUGINS_PATH = path.join(QGRID_PATH, 'ngx-plugins');

const OPTIONS = ['--prod'];

async function main() {
  // await buildLib('ngx-qgrid', OPTIONS);
  // await buildLib('ngx-qgrid-plugins', OPTIONS);
  // await buildLib('ng2-qgrid', OPTIONS);

  // buildTheme('ng2-qgrid-theme-basic');
  // await buildLib('ng2-qgrid-theme-basic', OPTIONS);

  // buildTheme('ng2-qgrid-theme-material');
  // await buildLib('ng2-qgrid-theme-material', OPTIONS);

  await Promise.all([
    relativeCopy('**/*.d.ts', CORE_PATH, QGRID_CORE_PATH),
    relativeCopy('**/*.d.ts', PLUGINS_PATH, QGRID_PLUGINS_PATH),
    relativeCopy('**/*.d.ts', DIST_NGX_QGRID_PATH, QGRID_NGX_PATH),
    relativeCopy('**/*.d.ts', DIST_NGX_QGRID_PLUGINS_PATH, QGRID_NGX_PLUGINS_PATH)
  ]);

  await fixImports(
    DIST_NG2_QGRID_PATH,
    '*/*.d.ts',
    ['@qgrid']
  );
}

main();
