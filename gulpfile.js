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
var tslint = require('gulp-tslint');
var tslintStylish = require('gulp-tslint-stylish');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var inlineNg2Template = require('gulp-inline-ng2-template');
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var argv = require('yargs').argv;
var notifier = require('node-notifier');
var assign = require('lodash.assign');

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

// Determine Environment before it is set for initialization
var gulpOption = argv._[0];
process.env.NODE_ENV = config.env = gulpOption === 'build' ? 'production' : 'development';

// Setup TypeScript project
var tsProject = ts.createProject(assign(require('./tsconfig.json'), {
    sortOutput: true
}));


/*
|--------------------------------------------------------------------------
| Internal Tasks
|--------------------------------------------------------------------------
|
| Tasks are defined below, that are use internally:
|
| - clean:*
|     Deletes the specific files, based on the clean task.
|
| - uglify
|     Minifies the JavaScript sorce files and adds inline
|     sourcemaps if the environment is not production.
|
| - less
|     Compiles less files and saves it into the distribution
|     folder.
|
| - copy:*
|     Copies files according to the task name.
|
| - bundle:*
|     Bundles files according to the task name.
|
| - lint:*
|     Lints specific types of files.
|
*/
gulp.task('clean:all', function() {
    return gulp.src([config.dist], {
            read: false
        })
        .pipe(clean().on('error', onError))
        .on('error', onError);
});

gulp.task('clean:scripts', function() {
    return gulp.src([
            config.dist + '/js/**/*.js',
            config.dist + '/js/**/*.map', '!' + config.dist + '/js/vendor/**/*.js',
            '!' + config.dist + '/js/vendor/**/*.map'
        ], {
            read: false
        })
        .pipe(clean().on('error', onError))
        .on('error', onError);
});

gulp.task('clean:styles', function() {
    return gulp.src([
            config.dist + '/css/**/*.css',
            config.dist + '/css/**/*.map'
        ], {
            read: false
        })
        .pipe(clean().on('error', onError))
        .on('error', onError);
});

gulp.task('clean:index', function() {
    return gulp.src([config.dist + '/index.html'], {
            read: false
        })
        .pipe(clean().on('error', onError))
        .on('error', onError);
});

gulp.task('clean:html', function() {
    return gulp.src([config.dist + '/**/*.html'], {
            read: false
        })
        .pipe(clean().on('error', onError))
        .on('error', onError);
});

gulp.task('clean:assets', function() {
    return gulp.src([config.dist + '/assets/**/*'], {
            read: false
        })
        .pipe(clean().on('error', onError))
        .on('error', onError);
});

gulp.task('typescript', function() {
    var less = require('less'), jade = require('jade');
    less.renderSync = function(input, options) {
        if (!options || typeof options != "object") options = {};
        options.sync = true;
        var css;
        this.render(input, options, function(err, result) {
            if (err) throw err;
            css = result.css;
        });
        return css;
    };

    var tsResult = gulp.src(config.ts.src)
        .pipe(inlineNg2Template({
            target: 'es5',
            useRelativePaths: true,
            templateProcessor: function(path, file) {
                return file;
                //return jade.render(file);
            },
            styleProcessor: function(path, file) {
                return less.renderSync(file);
            }
        }))
        .pipe(gulpif(config.env !== 'production', sourcemaps.init({
            loadMaps: false
        }).on('error', onError)))
        .pipe(ts(tsProject).on('error', onError));

    return tsResult.js
        .pipe( /*gulpif(config.env === 'production', */ uglify().on('error', onError) /*)*/ )
        .pipe(gulpif(config.env !== 'production', sourcemaps.write('./').on('error', onError)))
        .pipe(gulp.dest(config.ts.dest))

});

gulp.task('less', function() {
    return gulp.src(config.less.src)
        .pipe(gulpif(config.env !== 'production', sourcemaps.init().on('error', onError)))
        .pipe(less().on('error', onError))
        .pipe(cleanCSS().on('error', onError))
        .pipe(rename(config.less.name).on('error', onError))
        .pipe(gulpif(config.env !== 'production', sourcemaps.write('./').on('error', onError)))
        .pipe(gulp.dest(config.less.dest))
        .on('error', onError);
});

gulp.task('copy:index', function() {
    return gulp.src(config.index.src)
        .pipe(htmlreplace({
            'css': config.less.dest + '/' + config.less.name,
            'js': config.ts.dest + '/' + config.ts.name
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

gulp.task('copy:originals', function(done) {
    var src = clone(config.copy);
    var sources = [],
        destinations = [];

    src.forEach(function(element, index) {
        sources = [];

        element.src.forEach(function(path) {
            sources.push(element.base + path);
        });

        gulp.src(sources, {
                base: config.src + element.base
            })
            .pipe(gulp.dest(element.dest))
            .on('error', onError);
    });

    done();
});

gulp.task('bundle:vendor', function(done) {
    var src = clone(config.vendor.files);
    var sources = [],
        g = gulp;

    src.forEach(function(element, index) {
        element.src.forEach(function(path) {
            sources.push(element.base + path);
        });
    });

    return gulp.src(sources)
        .pipe(gulpif(config.env !== 'production', sourcemaps.init({
            loadMaps: false
        }).on('error', onError)))
        .pipe(concat('bundle.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulpif(config.env !== 'production', sourcemaps.write('./').on('error', onError)))
        .pipe(gulp.dest(config.vendor.dest));
});

gulp.task('lint:ts', function() {
    return gulp.src([config.ts.src])
        .pipe(tslint())
        .pipe(tslint.report(tslintStylish))
        .on('error', notifyError);
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

gulp.task('reload', function() {
    return gulp.src('./dist/*.html')
        .pipe(connect.reload());
});

gulp.task('start', function(done) {
    gutil.log(gutil.colors.green('Starting ' + config.env + ' build...'));

    return done();
});

gulp.task('finish', function(done) {
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
    notifyError(error);
}

function notifyError(error) {
    notifier.notify({
        title: 'Error',
        message: 'There was an error building your app.'
    });
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
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
| - clean:default
|     Only clear scripts (excluding vendor), styles and the index.
|
| - bundle
|     Execute all available bundle tasks.
|
| - lint
|     Run all available lint tasks.
|
*/
gulp.task('tasks', function(done) {
    return gulpSequence(['copy', 'typescript', 'less'])(done);
});

gulp.task('copy', function(done) {
    return gulpSequence(['copy:index', 'copy:assets', 'copy:originals'])(done);
});

gulp.task('clean:default', function(done) {
    return gulpSequence(['clean:scripts', 'clean:styles', 'clean:index'])(done);
});

gulp.task('bundle', function(done) {
    return gulpSequence(['bundle:vendor'])(done);
});

gulp.task('lint', function(done) {
    return gulpSequence(['lint:ts'])(done);
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
| - watch-build
|     Tasks that should run if a file changes.
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
    return gulpSequence('set-prod', 'start', 'lint', 'clean:all', ['tasks', 'bundle'], 'finish')(done);
});

gulp.task('dev-build', function(done) {
    return gulpSequence('set-dev', 'start', 'lint', 'clean:all', ['tasks', 'bundle'], 'finish')(done);
});

gulp.task('watch-build', function(done) {
    return gulpSequence('set-dev', 'start', 'lint', 'clean:default', 'tasks', 'finish')(done);
});

gulp.task('watch', function() {
    gulpSequence('dev-build')(function() {
        gulp.watch(config.watch, ['watch-build']);
    });
});

gulp.task('serve', function() {
    connect.server({
        root: config.dist,
        livereload: true,
        https: false,
        port: 5000
    });
});
