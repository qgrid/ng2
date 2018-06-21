'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const { uglify } = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');
const sass = require('npm-sass');
const inlineStyles = require('./build.inline');
const rollupConfigFactory = require('./build.theme.rollup');
const { relativeCopy, concatFiles } = require('./build.kit');
const tsConfig = require('./build.theme.tsconfig.json');
const packageJson = require('./package.json');

const rootFolder = path.join(__dirname);
const tscFolder = path.join(rootFolder, 'out-tsc/theme');
const srcFolder = path.join(rootFolder, 'src/theme');
const distFolder = path.join(rootFolder, 'dist');
const esm2015Folder = path.join(rootFolder, 'out-tsc/esm2015');

return Promise.resolve()
  // Copy library to temporary folder and inline html/css.
  .then(() => console.log(`copy: ${srcFolder}`))
  .then(() => relativeCopy(`**/*`, srcFolder, tscFolder))
  .then(() => relativeCopy(`**/*`, path.join(rootFolder, 'src/lib/assets'), path.join(rootFolder, 'out-tsc/lib/assets')))
  .then(() => console.log(`copy: succeeded`))
  .then(() => console.log('modify: package.json'))
  .then(() => {
    packageJson.devDependencies['ng2-qgrid'] = '*';

    fs.writeFileSync(
      'package.json',
      JSON.stringify(packageJson, null, 2)
    );

  })
  .then(() => console.log('modify: succeeded'))
  .then(() => {
    let task = Promise.resolve();
    for (let themeName of fs.readdirSync(tscFolder)) {
      const themeFolder = path.join(tscFolder, themeName);
      if (!fs.statSync(themeFolder).isDirectory()) {
        continue;
      }

      const esm2015Entry = path.join(esm2015Folder, `theme/${themeName}/index.js`);
      const libName = `theme-${themeName}`;
      const rollupConfig = rollupConfigFactory(libName);

      task =
        task
          // Copy library to temporary folder and inline html/css.
          .then(() => console.log(`theme: build`))
          // Build theme
          .then(() =>
            concatFiles({
              path: path.join(themeFolder, 'templates'),
              outputPath: path.join(themeFolder, 'theme.component.gen.html'),
            })
          )
          .then(() => console.log(`theme: succeeded`))
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
          .then(() => console.log('modify: build.theme.tsconfig.json'))
          .then(() => {
            tsConfig.files = [
              `./out-tsc/theme/${themeName}/theme.module.ts`
            ];

            tsConfig.angularCompilerOptions.flatModuleId = `ng2-qgrid/theme/${themeName}`,

            fs.writeFileSync(
              'build.theme.tsconfig.json',
              JSON.stringify(tsConfig, null, 2)
            );

          })
          .then(() => console.log('modify: succeeded'))
          // Compile to ESM2015.
          .then(() => console.log('ngc: build.theme.tsconfig.json'))
          .then(() => ngc(['--project', 'build.theme.tsconfig.json']))
          .then(code => code === 0 ? Promise.resolve() : Promise.reject())
          .then(() => console.log('ngc theme.esm2015: succeeded'))
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
          .then(() => relativeCopy('package.json', themeFolder, path.join(distFolder, `theme/${themeName}`)))
          .then(() => console.log('copy package: success'))
    }

    return task;
  })
  // Copy typings and metadata to `dist/` folder.
  .then(() => console.log(`copy metadata: ${distFolder}`))
  .then(() => relativeCopy('**/*.d.ts', esm2015Folder, distFolder))
  .then(() => relativeCopy('**/*.metadata.json', esm2015Folder, distFolder))
  .then(() => console.log('copy metadata: succeeded'))
  .catch(ex => {
    console.error('\nBuild failed. See below for errors.\n');
    console.error(ex);
    process.exit(1);
  });
