'use strict';

const cmdArgs = require('command-line-args');

const args = cmdArgs([{
  name: 'prod',
  type: Boolean,
  defaultValue: false
}]);

const { prod } = args;

const sane = require('sane');
const path = require('path');
const { spawn } = require('child_process');
const { concatFiles } = require('./build.kit');

const ROOT_PATH = path.resolve('.');
const SPAWN_OPTS = { shell: true, stdio: 'inherit' };

function resolvePathMarker(libName) {
  const FILE_MARKER = 'package.json';

  const themeRegexp = /ng2-qgrid-theme-([a-z]+)/is;
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

    const buildOptions = ['build', libName, '--watch'];
    if (prod) {
      buildOptions.push('--prod');
    }

    console.log(buildOptions);
    spawn(
      'ng',
      buildOptions,
      SPAWN_OPTS
    );
  });
}

function serve() {
  const serveOptions = ['serve', '--open'];
  if (prod) {
    serveOptions.push('--prod');
  }


  console.log(serveOptions);
  spawn(
    'ng',
    serveOptions,
    SPAWN_OPTS
  );
}

function buildTheme(libName) {
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

  console.log(`serve: build theme ${templatesPath}`);

  concatFiles({
    path: templatesPath,
    outputPath: path.join(libPath, 'theme.component.gen.html'),
  });
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

  sane(templatesPath)
    .on('all', (eventType, fileName) => {
      console.log(`serve: ${eventType}: ${fileName}`);

      buildTheme(libName);
    });
}

async function main() {
  await build('ngx-qgrid');
  await build('ngx-qgrid-plugins');

  await build('ng2-qgrid');

  buildTheme('ng2-qgrid-theme-basic');
  await build('ng2-qgrid-theme-basic');

  buildTheme('ng2-qgrid-theme-material');
  await build('ng2-qgrid-theme-material');

  watchTheme('ng2-qgrid-theme-basic');
  watchTheme('ng2-qgrid-theme-material');

  serve();
}

main();
