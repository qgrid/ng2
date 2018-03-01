const gulp = require('gulp');
const inline = require('./inline');
const sass = require('gulp-sass');

gulp.task('copy:src', () => {
	const copySrc = gulp.src('src/**/*').pipe(gulp.dest('out-tsc/src'));
	const copyCore = gulp.src('src/**/*').pipe(gulp.dest('out-tsc/core'));
	const copyPlugin = gulp.src('src/**/*').pipe(gulp.dest('out-tsc/plugin'));
	return [copySrc, copyCore, copyPlugin];
});

gulp.task('inline', () => {
	return inline('src/');
});

gulp.task('sass', function () {
	const convertAssets = gulp
		.src('src/assets/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(''));

	const convertTheme = gulp
		.src('src/theme/material/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(''));

	return [convertAssets, convertTheme];
});

gulp.task('copy', () => {
	const copyCore = gulp.src('core/**/*').pipe(gulp.dest('dist/core'));
	const copySrc = gulp.src('dist/src/**/*').pipe(gulp.dest('dist'));
	const copyPlugin = gulp.src('plugin/**/*').pipe(gulp.dest('dist/plugin'));
	return [copySrc, copyCore, copyPlugin];
});
