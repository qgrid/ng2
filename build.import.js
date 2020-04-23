'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function promiseify(fn) {
  return function () {
    const args = [].slice.call(arguments, 0);
    return new Promise((resolve, reject) => {
      fn.apply(this, args.concat([(err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      }]));
    });
  };
}

const readFile = promiseify(fs.readFile);
const writeFile = promiseify(fs.writeFile);

function dirDepth(path) {
  return path.split('\\').length;
};

function fixImports(rootPath) {
  const files = glob.sync('**/*.ts', { cwd: rootPath });
  const rootPathDepth = dirDepth(rootPath) + 1;
  return Promise.all(
    files.map(filePath => {
      const fullFilePath = path.join(rootPath, filePath);
      const fullFilePathDepth = dirDepth(fullFilePath);
      const diff = fullFilePathDepth - rootPathDepth;
      const basePath =
        Array
          .from(Array(diff).keys())
          .map(() => '..')
          .join('/') || '.';

      return readFile(fullFilePath, 'utf-8')
        .then(content => toRelativePath(content, filePath, basePath))
        .then(content => writeFile(fullFilePath, content))
        .catch(ex => console.error(ex));
    }));
}

function toRelativePath(content, filePath, relativePath) {
  return content
    .replace(/from\s+'@qgrid/g, () => {
      console.log(`import.fix: in ${filePath} replace "@qgrid" with "${relativePath}/@qgrid"`);
      return `from '${relativePath}/@qgrid`;
    });
}
module.exports = {
  fixImports
};
