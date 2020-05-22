'use strict';

const sane = require('sane');
const path = require('path');
const { spawn } = require('child_process');
const { concatFiles } = require('./build.utils');

const ROOT_PATH = path.resolve('.');
const SPAWN_OPTS = { shell: true, stdio: 'inherit' };

function resolvePathMarker(libName, marker) {
  const themeRegexp = /ng2-qgrid-theme-([a-z]+)/is;
  const themeMatch = themeRegexp.exec(libName);
  if (themeMatch) {
    const themeName = themeMatch[1];
    return path.join(
      'dist',
      'ng2-qgrid',
      'theme',
      themeName,
      marker
    );
  }

  return path.join(
    'dist',
    libName,
    marker
  );
}

function buildLib(name, options = [], marker = 'package.json') {
  const watchThat = resolvePathMarker(name, marker);

  console.log(`build.kit watch build ${watchThat}`);
  return new Promise((resolve) => {
    let watch = sane(ROOT_PATH)
      .on('add', (fileName) => {
        if (fileName === watchThat) {
          console.log(`build.kit add ${watchThat}`);
          watch.close();
          watch = null;
          resolve();
        }
      });

    const buildOptions = ['build', name].concat(options);
    console.log(buildOptions);

    spawn(
      'ng',
      buildOptions,
      SPAWN_OPTS
    );
  });
}

function serveApp(options = []) {
  const serveOptions = ['serve', '--open'];
  serveOptions.push(...options);

  console.log(serveOptions);
  spawn(
    'ng',
    serveOptions,
    SPAWN_OPTS
  );
}

function buildTheme(name) {
  const libPath = path.join(
    ROOT_PATH,
    'projects',
    name,
    'src',
    'lib'
  );

  const templatesPath = path.join(
    libPath,
    'templates'
  );

  console.log(`build.kit build theme ${templatesPath}`);

  concatFiles({
    path: templatesPath,
    outputPath: path.join(libPath, 'theme.component.gen.html'),
  });
}

function watchTheme(name) {
  const libPath = path.join(
    ROOT_PATH,
    'projects',
    name,
    'src',
    'lib'
  );

  const templatesPath = path.join(
    libPath,
    'templates'
  );

  sane(templatesPath)
    .on('all', (eventType, fileName) => {
      console.log(`build.kit ${eventType}: ${fileName}`);

      buildTheme(name);
    });
}

module.exports = {
  buildLib,
  buildTheme,
  watchTheme,
  serveApp
};