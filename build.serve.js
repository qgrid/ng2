'use strict';

const sane = require('sane');
const path = require('path');
const { spawn } = require('child_process');
const { concatFiles } = require('./build.kit');

const ROOT_PATH = path.resolve('.');
const SPAWN_OPTS = { shell: true, stdio: 'inherit' };

function resolvePathMarker(libName) {
  const FILE_MARKER = 'package.json';

  const themeRegexp = /ngx-qgrid-theme-([a-z]+)/is;
  const themeMatch = themeRegexp.exec(libName);
  if (themeMatch) {
    const themeName = themeMatch[1];
    return path.join(
      'dist',
      'ng2-qgrid',
      'theme',
      themeName,
      FILE_MARKER
    );
  }

  return path.join(
    'dist',
    libName,
    FILE_MARKER
  );
}

function build(libName) {
  const watchThat = resolvePathMarker(libName);

  console.log(`serve: watch build ${watchThat}`);
  return new Promise((resolve) => {
    const w = sane(ROOT_PATH)
      .on('add', (fileName) => {
        if (fileName === watchThat) {
          console.log(`serve: add ${watchThat}`);
          w.close();
          resolve();
        }
      });

    spawn(
      'ng',
      ['build', libName, '--watch'],
      SPAWN_OPTS
    );
  });
}

function serve() {
  spawn(
    'ng',
    ['serve', '--open'],
    SPAWN_OPTS
  );
}

function watchTheme(libName) {
  const libPath = path.join(
    ROOT_PATH,
    'projects',
    libName,
    'src',
    'lib'
  );

  const templatesPath = path.join(
    libPath,
    'templates'
  );

  console.log(`serve: watch theme ${templatesPath}`);
  sane(templatesPath)
    .on('all', (eventType, fileName) => {
      console.log(`serve: ${eventType}: ${fileName}`);

      concatFiles({
        path: templatesPath,
        outputPath: path.join(libPath, 'theme.component.gen.html'),
      });
    });
}

async function main() {
  await build('ngx-qgrid');
  await build('ngx-qgrid-plugins');
  await build('ng2-qgrid');
  await build('ngx-qgrid-theme-basic');
  await build('ngx-qgrid-theme-material');

  watchTheme('ngx-qgrid-theme-basic');
  watchTheme('ngx-qgrid-theme-material');

  serve();
}

main();
