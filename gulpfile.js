const gulp = require('gulp');

gulp.task('copy:assets', () => {
	return gulp
		.src(['src/**/*.html', 'src/**/*.scss', 'src/**/*.css', 'src/**/*.json'])
		.pipe(gulp.dest('dist/'));
});
