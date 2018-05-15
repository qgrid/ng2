'use strict';

const fs = require('fs');
const path = require('path');
const rootFolder = path.join(__dirname);

const settings = {
  encoding: 'utf-8',
  path: path.join(rootFolder, 'src/lib/theme/material/templates'),
  outputPath: path.join(rootFolder, 'src/lib/theme/material/theme.component.gen.html'),
  pattern: /.*\.tpl\.html/
};

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
