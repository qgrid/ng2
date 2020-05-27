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
  const SEP = '\\';
  path = path.trimRight(SEP);
  if (fs.statSync(path).isDirectory()) {
    return path.split(SEP).length;
  }

  return path.split(SEP).length - 1;
}

function inImports(rootPath, fix) {
  const files = glob.sync('**/*d.ts', { cwd: rootPath });
  const rootPathDepth = dirDepth(rootPath);
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
        .then(content => fix(content, basePath, filePath))
        .then(content => writeFile(fullFilePath, content))
        .catch(ex => console.error(ex));
    }));
}

function fixProjectPaths(content, relativePath, fileName) {
  console.log(`import.fix: looking for '@qgrid' in '${fileName}'`);
  return content
    .replace(/from\s+'@qgrid/g, () => {
      console.log(`import.fix: replaced with '${relativePath}/@qgrid'"`);
      return `from '${relativePath}/@qgrid`;
    })
    .replace(/from\s+"@qgrid/g, () => {
      console.log(`import.fix: replaced with '${relativePath}/@qgrid'"`);
      return `from "${relativePath}/@qgrid`;
    });
}

module.exports = {
  inImports,
  fixProjectPaths
};
