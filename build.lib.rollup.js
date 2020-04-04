'use strict';

const path = require('path');
const libName = require('./package.json').name;
const camelCase = require('camelcase');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');
const rootFolder = path.join(__dirname);
const tscFolder = path.join(rootFolder, 'out-tsc');

module.exports = {
  treeshake: true,
  output: {
    name: camelCase(libName),
    sourcemap: true,
    sourcemapFile: `${libName}.min.js`,
    // ATTENTION:
    // Add any dependency or peer dependency your library to `globals` and `external`.
    // This is required for UMD bundle users.
    globals: {
      // The key here is library name, and the value is the the name of the global variable name
      // the window object.
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',
      '@angular/common/http': 'ng.common.http',
      '@angular/material': 'ng.material',
      '@angular/forms': 'ng.forms'
    }
  },
  external: id =>
    [
      '@angular',
      'core-js',
      'rxjs',
      'zone.js'
    ].includes(id.split('/')[0])
  ,
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main', 'jsnext'],
      browser: true,
    }),
    commonjs({
      include: [
        'node_modules/css.escape/**',
        'node_modules/fastdom/**',
        'node_modules/livr/**'
      ],
      namedExports: {
        'node_modules/livr/lib/LIVR.js': ['Validator'],
        // 'node_modules/fastdom/fastdom.js': [ 'FastDom' ],
        'node_modules/css.escape/css.escape.js': ['cssEscape']
      }
    }),
    alias({
      entries: {
        'qgrid/core/': path.join(tscFolder, '/core/'),
        'qgrid/plugins/': path.join(tscFolder, '/plugin/')
      }
    })
  ]
};
