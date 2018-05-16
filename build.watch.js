'use strict';

const sane = require('sane');
const path = require('path');
const buildTheme = require('./build.theme');

const rootFolder = path.join(__dirname);
const themeFolder = path.join(rootFolder, 'src/lib/theme/material');
const templateFolder = path.join(themeFolder, 'templates');

function recycle() {
  buildTheme({
    path: templateFolder,
    outputPath: path.join(themeFolder, 'theme.component.gen.html'),
  });
}

console.log(`watch: ${templateFolder}`);
sane(templateFolder)
  .on('all', (eventType, fileName) => {
    console.log(`${eventType}: ${fileName}`);

    recycle();
  });

recycle();