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
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var insert = require('gulp-insert');
// var babel = require('gulp-babel');
var jspm = require('gulp-jspm-build');
var gulp_jspm = require('gulp-jspm');
var Builder = require('systemjs-builder');
var inlineNg2Template = require('gulp-inline-ng2-template');
var preprocess = require('gulp-preprocess');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var argv = require('yargs').argv;
var notifier = require('node-notifier');
var assign = require('lodash.assign');
var path = require('path');

var ng2RelativePath = requireIfExists(
  '../gulp-ng2-relative-path',
  'gulp-ng2-relative-path'
);

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
config.mode = 'lazy';

// Determine environment before it is set for initialization
process.env.NODE_ENV = config.env = argv._[0] === 'build' ? 'production' : 'development';

var tsOptions = config.mode === 'lazy' ? {} : {
  outFile: config.ts.name
};

var tsProject = ts.createProject('tsconfig.json', assign({
  sortOutput: true
}, tsOptions));

config.jspm.config.bundleOptions = config.jspm.config.bundleOptions || {};
config.jspm.config.bundleOptions.minify = config.env === 'production';
config.jspm.config.bundleOptions.mangle = config.env === 'production';
config.jspm.config.bundleOptions.sourceMaps = config.env !== 'production';

var builder = new Builder('.', 'system.config.js');

gulp.task('jspm3', function() {
  return jspm({
    bundles: [{
    src: [ 'app' ],
    dst: 'bundle.js'
  }],
  configOverride: {},
  bundleSfx: false
}).on('error', onError)
    .pipe(gulp.dest('temp/'))
    .on('error', onError);
});

gulp.task('builder', function(done) {
  builder
    .bundle('app', 'temp/bundle.js', {
      minify: false,
      mangle: false,
      sourceMaps: false,
      cssOptimize: true
    })
    .then(function() {
      done();
    })
    .catch(function(err) {
      onError(err);
    });
});

gulp.task('jspm2', function() {
  return gulp.src('src/main.ts')
    .pipe(gulp_jspm({
      verbose: true
    }))
    .pipe(gulp.dest('temp/'));
});

gulp.task('jspm', function() {
  return jspm(config.jspm.config).on('error', onError)
    .pipe(gulp.dest(config.jspm.dest))
    .on('error', onError);
});

/*
|--------------------------------------------------------------------------
| Internal Tasks
|--------------------------------------------------------------------------
|
| Tasks are defined below, that are used internally:
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
      config.dist + '/js/**/*.map'
    ], {
      read: false
    })
    .pipe(clean().on('error', onError))
    .on('error', onError);
});

gulp.task('clean:vendor', function() {
  return gulp.src([config.vendor.dest], {
      read: false
    })
    .pipe(clean().on('error', onError))
    .on('error', onError);
});

gulp.task('clean:styles', function() {
  return gulp.src([
      config.dist + '/css/**/*.css',
      config.dist + '/css/**/*.map',
      '!' + config.dist + '/**/*/' + config.icons.name
    ], {
      read: false
    })
    .pipe(clean().on('error', onError))
    .on('error', onError);
});

gulp.task('clean:iconfont', function() {
  return gulp.src(config.icons.dest + '/**/*', {
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

gulp.task('typescript:main', function() {
  var less = require('less'),
    jade = require('jade');

  less.renderSync = function(input, options) {
    if (!options || typeof options != "object") options = {};
    options.sync = true;
    options.async = false;
    var css;
    this.render(input, options, function(err, result) {
      if (err) throw err;
      css = result.css;
    });

    while (css === undefined) {
      require('deasync').sleep(100);
    }

    return css;
  };

  var pattern = new RegExp('^(' + config.ts.appBase + '/?)');

  var tsResult = gulp.src([config.ts.src], {
      'cwd': './'
    })
    .pipe(gulpif(config.env !== 'production', sourcemaps.init({
      loadMaps: true
    }).on('error', onError)))
    .pipe(preprocess({
      context: {
        config: config
      }
    }).on('error', onError))
    .pipe(gulpif(config.mode === 'lazy', ng2RelativePath({
      base: config.ts.base,
      appBase: config.ts.appBase,
      modifyPath: function(path) {
        return path + '?v=' + config.buildTimestamp;
      },
      modifyStylePath: function(path) {
        return path.replace('.less', '.css');
      }
    }).on('error', onError)).on('error', onError))
    .pipe(gulpif(config.mode === 'bundle', inlineNg2Template({
      // base: config.src + '/js',
      target: 'es5',
      removeLineBreaks: true,
      useRelativePaths: true,
      templateProcessor: function(path, file) {
        return file;
        // return jade.render(file);
      },
      styleProcessor: function(p, file) {
        var newFile = '@import "' + path.resolve(__dirname, config.ts.lessMaster) + '";\n\n' + file;

        return less.renderSync(newFile);
      },
      templateFunction: function(filename) {
        return filename.replace(pattern, './');
      }
    }).on('error', onError)).on('error', onError))
    .pipe(ts(tsProject).on('error', onError));

  var base = path.join(__dirname, config.ts.base);
  while (base.charAt(0) === '/') base = base.substr(1);

  return tsResult.js
    .pipe(rename(function(p) {
      p.dirname = p.dirname.replace(base, './');
    }).on('error', onError))
    .pipe(gulpif(config.env === 'production', uglify({
      mangle: config.ts.mangle
    }).on('error', onError)))
    .pipe(gulpif(config.env !== 'production', sourcemaps.write('./').on('error', onError)))
    .pipe(gulp.dest(config.ts.dest))
});

gulp.task('copy:modules', function() {
  var sources = clone(config.modules.modules).map(function(source) {
    if (source.startsWith('!')) {
      return '!' + config.modules.base + source.substring(1);
    }

    return config.modules.base + source;
  });

  var f = filter(config.modules.filter, {
    restore: true
  });

  return gulp
    .src(sources, {
      base: config.modules.base
    })
    .pipe(f)
    .pipe(gulpif(config.env === 'production', uglify({
      mangle: {
        keep_fnames: true
      },
      compress: {
        unused: false
      }
    }).on('error', onError)))
    .pipe(f.restore)
    .pipe(gulp.dest('./dist/modules'))
});

gulp.task('typescript:lazy', function(done) {
  if (config.mode === 'bundle') {
    return done();
  }

  return gulpSequence(['typescript:lazy:css', 'typescript:lazy:html'])(done);
});

gulp.task('typescript:lazy:css', function() {
  return gulp.src([config.ts.base + '/**/*.css', config.ts.base + '/**/*.less'])
    .pipe(gulpif(config.env !== 'production', sourcemaps.init().on('error', onError)))
    .pipe(insert.prepend('@import "' + path.resolve(__dirname, config.ts.lessMaster) + '";\n\n'))
    .pipe(less().on('error', onError))
    .pipe(cleanCSS().on('error', onError))
    .pipe(gulpif(config.env !== 'production', sourcemaps.write('./').on('error', onError)))
    .pipe(gulp.dest(config.ts.dest))
    .on('error', onError);
});

gulp.task('typescript:lazy:html', function() {
  return gulp.src([config.ts.base + '/**/*.html'])
    .pipe(gulp.dest(config.ts.dest))
    .on('error', onError);
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
    .pipe(preprocess({
      context: {
        config: config
      }
    }).on('error', onError))
    .pipe(rename(config.index.name).on('error', onError))
    .pipe(gulp.dest(config.index.dest))
    .on('error', onError);
});

gulp.task('copy:systemjsconfig', function() {
  return gulp.src(config.src + config.systemjs.configTemplate)
    .pipe(preprocess({
      context: {
        config: config
      }
    }).on('error', onError))
    .pipe(uglify().on('error', onError))
    .pipe(rename(config.systemjs.configFile).on('error', onError))
    .pipe(gulp.dest(config.dist))
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

    gulp.src(sources)
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
    var useSrc = config.env !== 'production' && element.devSrc ? element.devSrc : element.src;

    useSrc.forEach(function(path) {
      sources.push(element.base + path);
    });
  });

  return gulp.src(sources)
    .pipe(gulpif(config.env !== 'production', sourcemaps.init({
      loadMaps: true
    }).on('error', onError)))
    .pipe(concat(config.vendor.name))
    .pipe(gulpif(config.env === 'production', uglify({
      mangle: config.vendor.mangle
    })))
    .pipe(gulpif(config.env !== 'production', sourcemaps.write('./').on('error', onError)))
    .pipe(gulp.dest(config.vendor.dest));
});

gulp.task('lint:ts', function() {
  return gulp.src([config.ts.src])
    .pipe(tslint())
    .pipe(tslint.report(tslintStylish))
    .on('error', notifyError);
});

gulp.task('iconfont', function() {
  f = filter(['**/*.css'], {
    restore: true
  });

  gulp.src(config.icons.src)
    .pipe(iconfontCss({
      fontName: config.icons.fontName,
      cssClass: config.icons.cssClass,
      path: config.icons.templatePath,
      targetPath: config.icons.cssDest,
      fontPath: config.icons.fontDest
    }).on('error', onError))
    .pipe(f)
    .pipe(cleanCSS().on('error', onError))
    .pipe(f.restore)
    .pipe(iconfont({
      fontName: config.icons.fontName
    }).on('error', onError))
    .pipe(gulp.dest(config.icons.dest));
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

function exists(nodeModule) {
  try {
    require.resolve(nodeModule)
  } catch (e) {
    return false;
  }

  return true;
}

function requireIfExists(nodeModule, fallbackModule) {
  if (exists(nodeModule)) {
    return require(nodeModule)
  }

  if (fallbackModule) {
    return require(fallbackModule);
  }
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
| - typescript
|     Runs all required typescript tasks.
|
*/
gulp.task('master', function(done) {
  return gulpSequence('lint', 'clean:all', ['tasks', 'copy:modules', 'bundle', 'iconfont'], 'jspm')(done);
});

gulp.task('tasks', function(done) {
  return gulpSequence(['copy', 'typescript', 'less'])(done);
});

gulp.task('copy', function(done) {
  return gulpSequence(['copy:index', 'copy:systemjsconfig', 'copy:assets', 'copy:originals'])(done);
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

gulp.task('typescript', function(done) {
  return gulpSequence(['typescript:main', 'typescript:lazy'])(done);
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
|     A dev build performs the same tasks as
|     a prod build, but with the env set to
|     dev, which may result in different
|     behaviors in tasks.
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
  return gulpSequence('set-prod', 'start', 'master', 'finish')(done);
});

gulp.task('dev-build', function(done) {
  return gulpSequence('set-dev', 'start', 'master', 'finish')(done);
});

gulp.task('watch-build', function(done) {
  return gulpSequence('set-dev', 'start', 'lint', 'clean:default', ['tasks'], 'finish')(done);
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
