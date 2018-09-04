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
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/common/http': 'ng.common.http',
        '@angular/material': 'ng.material'
      }
    },
    external: [
      // List of dependencies
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
      '@angular/core',
      '@angular/common',
      '@angular/material',
      "@angular/animations",
      "@angular/common",
      "@angular/common/http",
      "@angular/compiler",
      "@angular/core",
      "@angular/forms",
      "@angular/http",
      "@angular/platform-browser",
      "@angular/platform-browser-dynamic",
      "@angular/router",
      "core-js",
      "rxjs",
      "zone.js",
      "ng2-qgrid"
    ],
    plugins: [
      nodeResolve({
        jsnext: true,
        module: true,
        main: true,
        browser: true
      }),
      commonjs()
    ]
  };
}
