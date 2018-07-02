'use strict';

const libName = require('./package.json').name;
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const { uglify } = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');
const sass = require('npm-sass');
const inlineStyles = require('./build.inline');
const rollupConfig = require('./build.lib.rollup');
const { relativeCopy } = require('./build.kit');

const rootFolder = path.join(__dirname);
const tscFolder = path.join(rootFolder, 'out-tsc');
const srcFolder = path.join(rootFolder, 'src');
// const themeFolder = path.join(tscFolder, 'theme/material');
const distFolder = path.join(rootFolder, 'dist');
const esm2015Folder = path.join(tscFolder, 'esm2015');
const esm2015Entry = path.join(esm2015Folder, 'index.js');


return Promise.resolve()
  // Copy library to temporary folder and inline html/css.
  .then(() => console.log(`copy: ${srcFolder}`))
  .then(() => relativeCopy(`**/*`, path.join(srcFolder, 'plugin'), path.join(tscFolder, 'plugin')))
  .then(() => relativeCopy(`**/*`, path.join(srcFolder, 'core'), path.join(tscFolder, 'core')))
  .then(() => relativeCopy(`**/*`, path.join(srcFolder, 'lib'), tscFolder))
  .then(() => console.log(`copy: succeeded`))
  // Inline styles and templates
  .then(() => console.log(`scss: ${tscFolder}`))
  .then(() => {
    const files = glob.sync('**/index.scss', { cwd: tscFolder });
    return Promise.all(files.map(name =>
      new Promise((resolve, reject) => {
        const filePath = path.join(tscFolder, name);
        console.log(`scss: ${filePath}`)
        sass(filePath, (err, result) => {
          if (err) {
            reject(err);
          } else {
            fs.writeFileSync(filePath.replace('.scss', '.css'), result.css);
            resolve(result);
          }
        });
      })
    ))
  })
  .then(() => console.log(`scss: success`))
  .then(() => console.log(`inline: ${tscFolder}`))
  .then(() => inlineStyles(tscFolder))
  .then(() => console.log('inline: succeeded'))
  // Compile to ESM2015.
  .then(() => console.log('ngc: build.lib.tsconfig.json'))
  .then(() => ngc(['--project', 'build.lib.tsconfig.json']))
  .then(code => code === 0 ? Promise.resolve() : Promise.reject())
  .then(() => console.log('ngc esm2015: succeeded'))
  // Copy typings and metadata to `dist/` folder.
  .then(() => console.log(`copy metadata: ${distFolder}`))
  .then(() => relativeCopy('**/*.d.ts', esm2015Folder, distFolder))
  .then(() => relativeCopy('**/*.metadata.json', esm2015Folder, distFolder))
  .then(() => relativeCopy('**/*.d.ts', path.join(tscFolder, 'core'), path.join(distFolder, 'core')))
  .then(() => relativeCopy('**/*.d.ts', path.join(tscFolder, 'plugin'), path.join(distFolder, 'plugin')))
  .then(() => console.log('copy metadata: succeeded'))
  // Bundle lib.
  .then(() => console.log(`bundle fesm2015: ${libName}`))
  .then(() => {
    const cfg = Object.assign({}, rollupConfig, {
      input: esm2015Entry,
      output: Object.assign({}, rollupConfig.output, {
        file: path.join(distFolder, 'fesm2015', `${libName}.js`),
        format: 'es'
      })
    });

    return rollup.rollup(cfg).then(bundle => bundle.write(cfg.output));
  })
  .then(() => console.log('bundle fesm2015: succeeded'))
  .then(() => console.log(`bundle umd: ${libName}`))
  .then(() => {
    const cfg = Object.assign({}, rollupConfig, {
      input: esm2015Entry,
      output: Object.assign({}, rollupConfig.output, {
        file: path.join(distFolder, 'bundles', `${libName}.umd.js`),
        format: 'umd'
      }),
      plugins: rollupConfig.plugins.concat([babel({})])
    });

    return rollup.rollup(cfg).then(bundle => bundle.write(cfg.output));
  })
  .then(() => console.log('bundle umd: succeeded'))
  .then(() => console.log(`bundle umd.min: ${libName}`))
  .then(() => {
    const cfg = Object.assign({}, rollupConfig, {
      input: esm2015Entry,
      output: Object.assign({}, rollupConfig.output, {
        file: path.join(distFolder, 'bundles', `${libName}.umd.min.js`),
        format: 'umd'
      }),
      plugins: rollupConfig.plugins.concat([babel({}), uglify({})])
    });

    return rollup.rollup(cfg).then(bundle => bundle.write(cfg.output));
  })
  .then(() => console.log('bundle umd.min: succeeded'))
  .then(() => console.log(`bundle fesm5: ${libName}`))
  .then(() => {
    const cfg = Object.assign({}, rollupConfig, {
      input: esm2015Entry,
      output: Object.assign({}, rollupConfig.output, {
        file: path.join(distFolder, 'fesm5', `${libName}.js`),
        format: 'es'
      }),
      plugins: rollupConfig.plugins.concat([babel({})])
    });
    return rollup.rollup(cfg).then(bundle => bundle.write(cfg.output));
  })
  .then(() => console.log('bundle fesm5: succeeded'))
  .then(() => console.log('bundle: successed'))
  // Copy package files
  .then(() => console.log('copy package: start'))
  .then(() => relativeCopy('LICENSE', rootFolder, distFolder))
  .then(() => relativeCopy('package.json', srcFolder, distFolder))
  .then(() => relativeCopy('README.md', rootFolder, distFolder))
  .then(() => relativeCopy('CHANGELOG.md', rootFolder, distFolder))
  .then(() => console.log('copy package: success'))
  .catch(ex => {
    console.error('\nBuild failed. See below for errors.\n');
    console.error(ex);
    process.exit(1);
  });