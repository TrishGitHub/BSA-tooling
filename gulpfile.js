var gulp = require('gulp');
var connect = require('gulp-connect');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

gulp.task('connect', function() {
	connect.server({
		port: 47,
		livereload: true,
		root: ['dist', 'dist/html']
	});
});

gulp.task('jade', function() {
	gulp.src('src/jade/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('dist/html'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	return gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
	.pipe(connect.reload());
	
});

gulp.task('requireJS', function() {
	// implement bundle.js file uglification
	rjs({
		baseUrl: 'src/js',
		name: '../../node_modules/almond/almond',
		include: ['app'],
		insertRequire: ['app'],
		out: 'bundle.js',
		wrap: true
	})
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
});

gulp.task('minify', function () {
    gulp.src('dist/js/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/min'));
});

gulp.task('watch', function() {
	gulp.watch('src/jade/*.jade', ['jade']);
	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('src/js/*.js', ['requireJS']);
	// add watch for .sass and .js files
});

gulp.task('default', ['requireJS', 'minify', 'jade', 'sass', 'connect', 'watch']);