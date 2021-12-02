'use strict';

const sane = require('sane');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

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

function serveApp(options = []) {
  const serveOptions = ['serve', '--open'];
  serveOptions.push(...options);

  console.log(serveOptions);
  spawn(
    'cd packages/ng2-qgrid-app && ng',
    serveOptions,
    SPAWN_OPTS
  );
}

function buildTheme(name) {
  const libPath = path.join(
    ROOT_PATH,
    'packages',
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
  return;
}

function watchTheme(name) {
  const libPath = path.join(
    ROOT_PATH,
    'packages',
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

function concatFiles(settings = {}) {
  settings = Object.assign(settings, {
    encoding: 'utf-8',
    pattern: /.*\.tpl\.html/
  });

  const pathes = fs.readdirSync(settings.path);
  const content = pathes
    .filter(file => file.match(settings.pattern))
    .map(file => {
      const p = path.join(settings.path, file);
      console.info(`read: ${p}`);
      return fs.readFileSync(p, { encoding: settings.encoding });
    })
    .join('');

  console.info(`write: ${settings.outputPath}`);

  if (!fs.existsSync(settings.outputPath) || fs.readFileSync(settings.outputPath, { encoding: settings.encoding }) !== content) {
    fs.writeFileSync(settings.outputPath, content);
  }
}

module.exports = {
  buildTheme,
  watchTheme,
  serveApp
};