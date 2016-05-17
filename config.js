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

// Use the build timestamp to prevent browser caching of new versions
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
| Modules Configuration
|--------------------------------------------------------------------------
|
| Define node modules/files to be copied to the distribution.
|
*/
config.modules = {
  dest: config.dist + '/modules',
  base: './node_modules',

  modules: [
    '/rxjs/**/*',
    '/@angular/**/*',
    // '/angular2/**/*',
    '/angular2-in-memory-web-api/**/*'
  ],

  // Filters files from above to be minified in production
  filter: [
    '**/*.js',
    '!*/@angular/**/esm/**/*',
    '!*/@angular/**/testing/**/*',
    // '!*/angular2/es6/**/*',
    '!*/@angular/bundles/**/*'
  ]
};


/*
|--------------------------------------------------------------------------
| SystemJS Configuration
|--------------------------------------------------------------------------
|
| Define the configuration for SystemJS.
|
*/
var map = {
  'app': 'dist/app',
  'rxjs': 'node_modules/rxjs',
  '@angular': 'node_modules/@angular',
  'css-animator': 'node_modules/css-animator'
};

var packages = {
  'app': {
    main: 'main.js',
    defaultExtension: 'js'
  },
  'rxjs': {
    defaultExtension: 'js'
  },
  'css-animator': {
    defaultExtension: 'js'
  }
};

var packageNames = [
  'css-animator',
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  '@angular/router-deprecated',
  '@angular/upgrade',
];

packageNames.forEach(function(pkgName) {
  packages[pkgName] = {
    main: 'index.js',
    defaultExtension: 'js'
  };
});

config.systemjs = {
  configTemplate: '/system.config.js',
  configFile: '/system.config.js',
  config: {
    map: map,
    packages: packages
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
for (var property in config.systemjs) {
  if (!config.systemjs.hasOwnProperty(property)) {
    continue;
  }
  config.systemjs[property + 'String'] = JSON.stringify(config.systemjs[property]);
}


/*
|--------------------------------------------------------------------------
| JSPM Configuration
|--------------------------------------------------------------------------
|
| You can define modules to bundle which are defined in the SystemJS
| configuration.
|
*/
config.jspm = {
  dest: config.dist + '/modules',
  config: {
    // config: 'system.config.js',
    bundleOptions: {
      mangle: false,
      sourceMaps: false
    },
    bundles: [{
      src: 'app',
      dst: 'bundle.js',
      options: {
        minify: true,
        mangle: true
      }
    }],
    // baseUrl: './dist',
    // config: './system.config.js',
    // config: 'system.config.js',
    configOverride: {
      //jspm: {
        // "directories": {
        //   "baseURL": "./dist"
        // },
        // "configFile": "system.config.js"
      //}
      // baseURL: config.dist
      // baseURL: config.dest + '/modules',
      // configFile: 'system.config.js'
    }
  }
};

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
  dest: config.dist + '/vendor',
  name: 'bundle.js',

  // Due to issues with mangling in Angular2 beta,
  // we will keep the original function names.
  mangle: {
    keep_fnames: true
  },

  files: [{
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
      base: './node_modules/systemjs/dist',
      src: [
        '/system.src.js'
        //'/system-register-only.js'
      ]
    }, {
      base: './node_modules/rxjs/bundles',
      src: [
        '/Rx.js'
      ]
    }, {
      base: './node_modules/css-animator/bundles',
      src: [
        '/css-animator.min.js'
      ],
      devSrc: [
        '/css-animator.js'
      ]
    }
    // , {
    //   base: './node_modules/jquery/dist',
    //   src: [
    //     '/jquery.min.js'
    //   ],
    //   devSrc: [
    //     '/jquery.js'
    //   ]
    // }, {
    //   base: './node_modules/materialize-css/dist/js',
    //   src: [
    //     '/materialize.min.js'
    //   ],
    //   devSrc: [
    //     '/materialize.js'
    //   ]
    // }
  ]
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
