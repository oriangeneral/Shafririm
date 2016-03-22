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
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var gulpif = require('gulp-if');
var connect = require('gulp-connect');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var merge = require('merge2');
var notifier = require('node-notifier');


/*
|--------------------------------------------------------------------------
| Global Definitions
|--------------------------------------------------------------------------
|
| All configurations can be defined in config.js. The environment
| will be set automatically and can be changed by using either
| "gulp build" or "gulp dev-build".
|
| Also all other global definitions go here, like defining the
| typescript project.
|
*/
var config = require('./config');
config.env = process.env.NODE_ENV;

var tsProject = ts.createProject({
    // declaration: true,
    noExternalResolve: true,
    sortOutput: true
});

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
		.pipe(clean().on('error', onError))
    .on('error', onError);
});

gulp.task('scripts', function() {
  var tsResult = gulp.src(config.ts.src)
    .pipe(gulpif(config.env !== 'production', sourcemaps.init().on('error', onError)))
    .pipe(ts(tsProject).on('error', onError))
    .on('error', onError);

    return tsResult.js
      .pipe(concat(config.ts.name).on('error', onError))
      .pipe(uglify().on('error', onError))
      .pipe(gulpif(config.env !== 'production', sourcemaps.write().on('error', onError)))
      .pipe(gulp.dest(config.ts.dest))
      .on('error', onError);
});

gulp.task('less', function() {
  return gulp.src(config.css.src)
    .pipe(less().on('error', onError))
    .pipe(rename(config.css.name).on('error', onError))
    .pipe(gulp.dest(config.css.dest));
});

gulp.task('copy:index', function() {
  return gulp.src(config.index.src)
    .pipe(htmlreplace({
      'css': config.css.dest + '/' + config.css.name,
      'js': config.js.dest + '/' + config.js.name
    }).on('error', onError))
    .pipe(rename(config.index.name).on('error', onError))
    .pipe(gulp.dest(config.index.dest))
    .on('error', onError);
});

gulp.task('copy:assets', function() {
  return gulp.src(config.assets.src)
    .pipe(gulp.dest(config.assets.dest))
    .on('error', onError);
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
  return gulp.src('./dist/*.html')
    .pipe(connect.reload());
});

gulp.task('start', function (done) {
  gutil.log(gutil.colors.green('Starting ' + config.env + ' build...'));

  return done();
});

gulp.task('finish', function (done) {
  gutil.log(gutil.colors.green('Build has finished.'));

  notifier.notify({
    title: 'Build Successful',
    message: 'All build tasks have finished and your app is ready.'
  });

  return done();
});

/*
|--------------------------------------------------------------------------
| Helper Functions
|--------------------------------------------------------------------------
|
| Simple functions for different purposes.
|
*/

function onError(error) {
  gutil.log(gutil.colors.red('Error: ' + error));

  notifier.notify({
    title: 'Error',
    message: 'There was an error building your app.'
  });
}

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
gulp.task('tasks', function(done) {
  return gulpSequence('clean', ['copy', 'scripts', 'less'])(done);
});

gulp.task('copy', function(done) {
  return gulpSequence(['copy:index', 'copy:assets'])(done);
});


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
gulp.task('build', function(done) {
  return gulpSequence('set-prod', 'start', 'tasks', 'finish')(done);
});

gulp.task('dev-build', function(done) {
  return gulpSequence('set-dev', 'start', 'tasks', 'finish')(done);
});

gulp.task('watch-build', ['dev-build'], function(done) {
  return gulpSequence('reload', 'finish')(done);
});

gulp.task('watch', ['dev-build'], function () {
  gulp.watch(config.watch, ['watch-build']);
});

gulp.task('serve', function() {
  connect.server({
    root: config.dist,
    livereload: true,
    https: false,
    port: 5000
  });
});
