const gulp = require('gulp');

const ADD_MANIFEST = 'add-package-json';
const ADD_CORE = 'copy-core';

gulp.task(ADD_MANIFEST, () => gulp.src('package.json').pipe(gulp.dest('dist')));

gulp.task(ADD_CORE, () => gulp.src('src/core/**/*.d.ts').pipe(gulp.dest('dist/core')));

gulp.task('dist', [ADD_CORE, ADD_MANIFEST]);
