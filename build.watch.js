'use strict';

const sane = require('sane');
const path = require('path');
const buildTheme = require('./build.theme');
const fs = require('fs');

const rootFolder = path.join(__dirname);
const themeFolder = path.join(rootFolder, 'src/theme');

for (let unit of fs.readdirSync(themeFolder)) {
  const unitFolder = path.join(themeFolder, unit);
  if (!fs.statSync(unitFolder).isDirectory()) {
    continue;
  }

  const templateFolder = path.join(unitFolder, 'templates');

  function recycle() {
    buildTheme({
      path: templateFolder,
      outputPath: path.join(unitFolder, 'theme.component.gen.html'),
    });
  }

  console.log(`watch: ${templateFolder}`);
  sane(templateFolder)
    .on('all', (eventType, fileName) => {
      console.log(`${eventType}: ${fileName}`);

      recycle();
    });

  recycle();
}