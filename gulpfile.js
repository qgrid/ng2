const gulp = require('gulp');
const inline = require('./inline');
const sass = require('gulp-sass');

gulp.task('copy:src', () => {
	const copySrc = gulp.src('src/**/*').pipe(gulp.dest('out-tsc/src'));
	const copyCore = gulp.src('core/**/*').pipe(gulp.dest('out-tsc/core'));
	const copyPlugin = gulp.src('plugin/**/*').pipe(gulp.dest('out-tsc/plugin'));
	return [copySrc, copyCore, copyPlugin];
});

gulp.task('copy:out', () => {
	return gulp.src('dist/out-tsc/src/**/*').pipe(gulp.dest('dist'));
});

gulp.task('inline', () => {
	return inline('out-tsc/src/');
});

gulp.task('sass', function () {
	const convertAssets = gulp
		.src('out-tsc/src/assets/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('out-tsc/src/assets/'));

	const convertTheme = gulp
		.src('out-tsc/src/theme/material/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('out-tsc/src/theme/material/'));

	return [convertAssets, convertTheme];
});

gulp.task('copy', () => {
	const copyCore = gulp.src('core/**/*.d.ts').pipe(gulp.dest('dist/core'));
	const copyPlugin = gulp.src('plugin/**/*.d.ts').pipe(gulp.dest('dist/plugin'));
	return [copyCore, copyPlugin];
});
