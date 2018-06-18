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

function relativeCopySync(fileGlob, from, to, visit = x => x) {
  const files = glob.sync(fileGlob, { cwd: from, nodir: true });

  files.forEach(file => {
    const srcPath = path.join(from, file);
    const dstPath = path.join(to, file);
    const content = fs.readFileSync(srcPath, 'utf-8');
    makeFolderTree(path.dirname(dstPath));

    const result = visit({ srcPath, dstPath, content });
    fs.writeFileSync(result.dstPath, result.content);
    console.log(`copy: ${file} -> ${result.dstPath}`);
  });
}

// Recursively create a dir.
function makeFolderTree(dir) {
  if (!fs.existsSync(dir)) {
    makeFolderTree(path.dirname(dir));
    fs.mkdirSync(dir);
  }
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

function toComponentName(name) {
	return name
		.split('-')
		.map(part => part[0].toUpperCase() + part.slice(1))
		.join('');
}

module.exports = {
  relativeCopy,
  relativeCopySync,
  concatFiles,
  toComponentName
};