const gulp = require('gulp');

gulp.task('copy:assets', () => {
	return gulp
		.src(['src/**/*.html', 'src/**/*.scss', 'src/**/*.css'])
		.pipe(gulp.dest('dist/'));
});

// gulp.task('copy:artifacts', () => {
// 	return gulp
// 		.src(['dist/**/*'])
// 		.pipe(gulp.dest('dist'));
// });
