'use strict';

const path = require('path');
const fs = require('fs');
const { inImports, fixProjectPaths } = require('./build.import');
const { buildLib, buildTheme } = require('./build.kit');
const { relativeCopy } = require('./build.utils');

const ROOT_PATH = path.resolve('.');
const PROJECTS_PATH = path.join(ROOT_PATH, 'projects');
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const NG2_DIST_PATH = path.join(DIST_PATH, 'ng2-qgrid');

const OPTIONS = ['--prod'];

async function main() {
  await buildLib('ngx-qgrid', OPTIONS);
  await buildLib('ngx-qgrid-plugins', OPTIONS);
  await buildLib('ng2-qgrid', OPTIONS);

  await relativeCopy('**/*.d.ts',
    path.join(PROJECTS_PATH, 'qgrid-core'),
    path.join(NG2_DIST_PATH, '@qgrid', 'core')
  );

  await relativeCopy('**/*.d.ts',
    path.join(PROJECTS_PATH, 'qgrid-plugins'),
    path.join(NG2_DIST_PATH, '@qgrid', 'plugins')
  );

  await relativeCopy('**/*.d.ts',
    path.join(DIST_PATH, 'ngx-qgrid'),
    path.join(NG2_DIST_PATH, '@qgrid', 'ngx')
  );

  await relativeCopy('**/*.d.ts',
    path.join(DIST_PATH, 'ngx-qgrid-plugins'),
    path.join(NG2_DIST_PATH, '@qgrid', 'ngx-plugins')
  );

  await inImports(NG2_DIST_PATH, fixProjectPaths);

  buildTheme('ng2-qgrid-theme-basic');
  await buildLib('ng2-qgrid-theme-basic', OPTIONS);

  await relativeCopy('package.prod.json',
    path.join(DIST_PATH, 'ngx-qgrid-plugins'),
    path.join(NG2_DIST_PATH, '@qgrid', 'ngx-plugins')
  );

  buildTheme('ng2-qgrid-theme-material');
  await buildLib('ng2-qgrid-theme-material', OPTIONS);

  console.log('build.lib: copy package.json');
  fs.copyFileSync(
    path.join(PROJECTS_PATH, 'ng2-qgrid', 'package.prod.json'),
    path.join(NG2_DIST_PATH, 'package.json')
  );
}

main();
