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
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/'));
});

gulp.task('copy:assets', () => {
	return gulp
		.src(['src/**/*.html', 'src/**/*.scss', 'src/**/*.css', 'src/**/*.json'])
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy:src', () => {
	const copySrc = gulp.src('src/**/*').pipe(gulp.dest('out-tsc/src'));
	const copyCore = gulp.src('src/**/*').pipe(gulp.dest('out-tsc/core'));
	const copyPlugin = gulp.src('src/**/*').pipe(gulp.dest('out-tsc/plugin'));
	return [copySrc, copyCore, copyPlugin];
});
