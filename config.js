var assign = require('lodash.assign');

/*
|--------------------------------------------------------------------------
| BUILD CONFIGURATION
|--------------------------------------------------------------------------
|
| All configurations concerning the build go here.
|
| Note that you can always use an array for src, to be more
| specific or to exclude files.
|
| TypeScript Lint Configuration:
|   - tslint.json
|
| TypeScript Configutation:
|   - tsconfig.json
|
| Reserved:
|
| - config.env
|
*/
var config = config || {};

// Save a build timestmamp
config.buildTimestamp = new Date().valueOf();

/*
|--------------------------------------------------------------------------
| Mode
|--------------------------------------------------------------------------
|
| Choose a desired mode.
|
| - bundle
|     Files will be concatinated (for use with HTTP)
|
| - lazy
|     Files will be lazy loaded (for use with HTTP2)
|
*/
config.mode = 'lazy';


/*
|--------------------------------------------------------------------------
| Source and Distribution Location
|--------------------------------------------------------------------------
|
| Define the location of the source and distribution folder.
|
*/
config.src = './src';
config.dist = './dist';


/*
|--------------------------------------------------------------------------
| Watch Files
|--------------------------------------------------------------------------
|
| Define files, which "gulp watch" should keep an eye on.
|
*/
config.watch = ['src/**/*', '!src/assets/**/*'];



/*
|--------------------------------------------------------------------------
| SystemJS Configuration
|--------------------------------------------------------------------------
|
| Define the configuration for SystemJS.
|
*/
config.systemjs = {
  config: {
    packages: {
      'app': {
        defaultExtension: 'js?v' + config.buildTimestamp,
        baseUrl: '/app'
      }
    }
  },
  bundle: {
    entryFile: 'app/app',
    entryModule: 'main'
  },
  lazy: {
    entryFile: 'app/main'
  }
};

// Do not remove or modify this line!
config.systemjs.configString = JSON.stringify(config.systemjs.config);

/*
|--------------------------------------------------------------------------
| TypeScript Configuration
|--------------------------------------------------------------------------
|
| Define the source and destination path, as well as the
| concatinated file name.
|
| Please note, that some configuration is set inside tsconfig.json!
|
*/
config.ts = config.ts || {};

config.ts.appBase = '/app';

config.ts = assign(config.ts, {
  src: config.src + '/js/**/*.ts',
  base: config.src + '/js',
  entry: config.src + '/js/main.ts',
  dest: config.dist + config.ts.appBase,
  name: 'app.js',

  // File to include to ANY less file. Make sure to only
  // define variables and functions in it to not pollute
  // the css code.
  lessMaster: config.src + '/css/variables/vars.less',

  // Due to issues with mangling in Angular2 beta,
  // we will keep the original function names.
  mangle: {
    keep_fnames: true
  }
});


/*
|--------------------------------------------------------------------------
| LESS Configuration
|--------------------------------------------------------------------------
|
| Define the source and destination path, as well as the
| concatinated file name. You may also use less for styleUrls
| within angular2.
|
*/
config.less = {
  src: config.src + '/css/app.less',
  dest: config.dist + '/css',
  name: 'app.css'
};


/*
|--------------------------------------------------------------------------
| Index File Configuration (Main Entry Point)
|--------------------------------------------------------------------------
|
| Define the source and destination path, as well as the
| file name.
|
*/
config.index = {
  src: config.src + '/index.html',
  dest: config.dist,
  name: 'index.html'
};


/*
|--------------------------------------------------------------------------
| Iconfont Configuration
|--------------------------------------------------------------------------
|
| Set all required configurations for creating an
| iconfont and the CSS from SVGs.
|
*/
config.icons = {
  name: 'icons.css', // must match with the filename used in cssDest
  src: './node_modules/flat-color-icons/svg/*.svg',
  dest: config.dist + '/fonts',
  cssDest: '../css/icons.css', // relative to dest
  fontDest: '../fonts/icons', // relative to cssDest
  templatePath: './node_modules/gulp-iconfont-css/templates/_icons.css',
  fontName: 'Icons',
  cssClass: 'icon'
};


/*
|--------------------------------------------------------------------------
| Vendor JavaScript Files
|--------------------------------------------------------------------------
|
| For faster builds, vendor files are only bundled into a single file,
| but not compiled by TypeScript.
|
| If 'devSrc' is specified alongside 'src', 'devSrc' will be used, if
| the environment is NOT in production.
|
*/
config.vendor = {
  dest: config.dist + '/vendor/js',
  name: 'bundle.js',

  // Due to issues with mangling in Angular2 beta,
  // we will keep the original function names.
  mangle: {
    keep_fnames: true
  },

  files: [{
    base: './node_modules/systemjs/dist',
    src: [
      '/system.js'
      //'/system-register-only.js'
    ]
  }, {
    base: './node_modules/rxjs/bundles',
    src: [
      '/Rx.js'
    ]
  }, {
    base: './node_modules/zone.js/dist',
    src: [
      '/zone.js'
    ]
  }, {
    base: './node_modules/reflect-metadata',
    src: [
      '/Reflect.js'
    ]
  }, {
    base: './node_modules/angular2/bundles',
    devSrc: [
      '/angular2.dev.js',
      '/router.dev.js'
    ],
    src: [
      // Using .min.js for Angular2 beta causes issues in production mode
      '/angular2.js',
      '/router.js'
    ]
  }]
};

/*
|--------------------------------------------------------------------------
| Assets Configuration
|--------------------------------------------------------------------------
|
| Define the source and destination path, as well as the
| concatinated file name. Files will be copied as-is.
|
*/
config.assets = {
  src: config.src + '/assets/**/*',
  dest: config.dist + '/assets'
};


/*
|--------------------------------------------------------------------------
| Copy Configuration
|--------------------------------------------------------------------------
|
| Define additional files that should be copied.
|
*/
config.copy = [{
  base: config.src + '/resources',
  src: [
    '/favicon.ico'
  ],
  dest: config.dist + '/'
}, {
  base: config.src + '/css/images',
  src: [
    '/**/*'
  ],
  dest: config.dist + '/css/images'
}, {
  base: config.src + '/css/fonts',
  src: [
    '/**/*'
  ],
  dest: config.dist + '/css/fonts'
}];

module.exports = config;
