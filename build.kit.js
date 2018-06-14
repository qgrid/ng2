'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Copy files maintaining relative paths.
function relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
      if (err) {
        reject(err);
      }

      files.forEach(file => {
        const origin = path.join(from, file);
        const dest = path.join(to, file);
        const data = fs.readFileSync(origin, 'utf-8');
        makeFolderTree(path.dirname(dest));
        fs.writeFileSync(dest, data);
        console.log(`copy: ${file}`);
      });

      resolve();
    })
  });
}

// Recursively create a dir.
function makeFolderTree(dir) {
  if (!fs.existsSync(dir)) {
    makeFolderTree(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}

module.exports = {
  relativeCopy
};