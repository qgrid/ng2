'use strict';

const sane = require('sane');
const path = require('path');
const fs = require('fs');

const ROOT_PATH = path.resolve('.');

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
  buildLib,
  buildTheme,
  watchTheme,
  serveApp
};