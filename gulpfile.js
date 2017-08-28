const gulp = require('gulp');
const sass = require('node-sass');
const inlineTemplates = require('gulp-inline-ng2-template');

/**
 * Inline templates configuration.
 * @see  https://github.com/ludohenin/gulp-inline-ng2-template
 */
const INLINE_TEMPLATES = {
	SRC: './src/**/*.ts',
	DIST: './dist',
	CONFIG: {
		base: '/src',
		useRelativePaths: true,
		styleProcessor: compileSass
	}
};

/**
 * Inline external HTML and SCSS templates into Angular component files.
 * @see: https://github.com/ludohenin/gulp-inline-ng2-template
 */
gulp.task('inline-templates', () => {
	return gulp.src(INLINE_TEMPLATES.SRC)
		.pipe(inlineTemplates(INLINE_TEMPLATES.CONFIG))
		.pipe(gulp.dest(INLINE_TEMPLATES.DIST));
});

function compileSass(path, ext, file, callback) {
	let compiledCss = sass.renderSync({
		data: file,
		outputStyle: 'compressed',
	});
	callback(null, compiledCss.css);
}
