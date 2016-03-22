/**
 * Gulp and plugins
 */
var gulp = require('gulp');
var sequence = require('gulp-sequence');
var connect = require('gulp-connect');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

/**
 * Configuration object
 */
var config = require('./config');

gulp.task('uglify', function() {
  return gulp.src(config.js.src)
    .pipe(uglify())
    .pipe(rename(config.js.name))
    .pipe(gulp.dest(config.js.dest));
});

gulp.task('less', function() {
  return gulp.src(config.css.src)
    .pipe(less())
    .pipe(rename(config.css.name))
    .pipe(gulp.dest(config.css.dest));
});

gulp.task('copy:index', function() {
  return gulp.src(config.index.src)
    .pipe(htmlreplace({
      'css': 'css/style.css',
      'js': 'js/script.js'
    }))
    .pipe(rename(config.index.name))
    .pipe(gulp.dest(config.index.dest));
});

gulp.task('clean', function () {
	return gulp.src(config.dist, {read: false})
		.pipe(clean());
});

gulp.task('build', sequence('clean', ['copy:index', 'uglify', 'less']));

gulp.task('serve', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src('./dist/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*'], ['build', 'reload']);
});
