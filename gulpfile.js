/*
|--------------------------------------------------------------------------
| Dependencies
|--------------------------------------------------------------------------
|
| Below you can add all files and plugins you need within
| your tasks.
|
*/
var gulp = require('gulp');
var sequence = require('gulp-sequence');
var gulpif = require('gulp-if');
var connect = require('gulp-connect');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');
var clean = require('gulp-clean');


/*
|--------------------------------------------------------------------------
| Configuration
|--------------------------------------------------------------------------
|
| All configurations can be defined in config.js. The environment
| will be set automatically and can be changed by using either
| "gulp build" or "gulp dev-build"
|
*/
var config = require('./config');
config.env = process.env.NODE_ENV;


/*
|--------------------------------------------------------------------------
| Internal Tasks
|--------------------------------------------------------------------------
|
| Tasks are defined below, that are use internally:
|
| - clean
|     Deletes the distribution folder.
|
| - uglify
|     Minifies the JavaScript sorce files and adds inline
|     sourcemaps if the environment is not production.
|
| - less
|     Compiles less files and saves it into the distribution
|     folder.
|
| - copy:index
|     Copies the index file to the distribution folder and
|     performs required transformations.
|
*/
gulp.task('clean', function () {
	return gulp.src(config.dist, {read: false})
		.pipe(clean());
});

gulp.task('uglify', function() {
  return gulp.src(config.js.src)
    .pipe(gulpif(config.env !== 'production', sourcemaps.init()))
      .pipe(uglify())
    .pipe(gulpif(config.env !== 'production', sourcemaps.write()))
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
      'css': config.css.dest + '/' + config.css.name,
      'js': config.js.dest + '/' + config.js.name
    }))
    .pipe(rename(config.index.name))
    .pipe(gulp.dest(config.index.dest));
});

gulp.task('copy:assets', function() {
  return gulp.src(config.assets.src)
    .pipe(gulp.dest(config.assets.dest));
});


/*
|--------------------------------------------------------------------------
| Helper Tasks
|--------------------------------------------------------------------------
|
| The following tasks are used as helpers. Currently
| tasks exist to change the envoronment and to reload
| the browser when something has chaged (live reload).
|
*/
gulp.task('set-dev', function() {
   return process.env.NODE_ENV = config.env = 'development';
});
gulp.task('set-prod', function() {
   return process.env.NODE_ENV = config.env = 'production';
});

gulp.task('reload', function () {
  gulp.src('./dist/*.html')
    .pipe(connect.reload());
});


/*
|--------------------------------------------------------------------------
| Task Collections
|--------------------------------------------------------------------------
|
| The tasks below bundle common sequences:
|
| - tasks
|     The main task sequence.
|
| - copy
|     Should bundle all tasks prefixed with "copy:".
|
*/
gulp.task('tasks', sequence('clean', ['copy', 'uglify', 'less']));
gulp.task('copy', sequence(['copy:index', 'copy:assets']));


/*
|--------------------------------------------------------------------------
| Main Tasks
|--------------------------------------------------------------------------
|
| These tasks are intended to be called via the console:
|
| - build
|     Performs a production build.
|
| - dev-build
|     Performs a development build.
|
| - watch
|     Performs a development build everytime
|     something has changes.
|
| - serve
|     Brings up a server, to test the app
|     locally.
|
*/
gulp.task('build', sequence('set-prod', 'tasks'));

gulp.task('dev-build', sequence('set-dev', 'tasks'));

gulp.task('watch', function () {
  gulp.watch(config.watch, ['dev-build', 'reload']);
});

gulp.task('serve', function() {
  connect.server({
    root: config.dist,
    livereload: true,
    https: false,
    port: 5000
  });
});
