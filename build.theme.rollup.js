'use strict';

const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = function (libName) {
  return {
    treeshake: false,
    output: {
      name: libName,
      sourcemap: true,
      sourcemapFile: `${libName}.min.js`,
      // ATTENTION:
      // Add any dependency or peer dependency your library to `globals` and `external`.
      // This is required for UMD bundle users.
      globals: {
        // The key here is library name, and the value is the the name of the global variable name
        // the window object.
        // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
        '@angular/animations': 'ng.animations',
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/common/http': 'ng.common.http',
        '@angular/material': 'ng.material',
        '@angular/forms': 'ng.forms',
        '@angular/platform-browser': 'ng.platform.browser',
        'ng2-qgrid': 'ng.qgrid',
        'rxjs': 'rxjs',
      }
    },
    external: id =>
      [
        '@angular',
        'core-js',
        'rxjs',
        'ng2-qgrid',
        'zone.js'
      ].includes(id.split('/')[0])
    ,
    plugins: [
      nodeResolve({
        mainFields: ['module', 'main', 'jsnext'],
        browser: true,
      }),
      commonjs()
    ]
  };
}
