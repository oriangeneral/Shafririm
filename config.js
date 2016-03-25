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
| Reserved:
|
| - config.env
|
*/
var config = config || {};
config.browserify = {};

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
| JavaScript Mode
|--------------------------------------------------------------------------
|
| Define whether to use JavaScript (with Babel/ES6) or TypeScript.
|
| - javascript
|     JavaScript with support for ES6 (ES2015) will be used.
|
| - browserify
|     JavaScript with Browserify and support for ES6 (ES2015)
|     will be used.
|
| - typescript
|     TypeScript will be used which also uses Browserify for CommonJS.
|
*/
config.javaScriptMode = 'typescript';


/*
|--------------------------------------------------------------------------
| JavaScript Configuration
|--------------------------------------------------------------------------
|
| Define the source and destination path, as well as the
| concatinated file name.
|
*/
config.js = {
  src: config.src + '/js/**/*.js',
  dest: config.dist + '/js',
  name: 'app.js'
};

/*
|--------------------------------------------------------------------------
| TypeScript Configuration
|--------------------------------------------------------------------------
|
| Define the source and destination path, as well as the
| concatinated file name.
|
*/
config.ts = {
  entry: config.src + '/js/app.ts',
  dest: config.dist + '/js',
  name: 'app.js'
};

/*
|--------------------------------------------------------------------------
| Browserify Configuration
|--------------------------------------------------------------------------
|
| Define the source and destination path, as well as the
| concatinated file name.
|
*/
config.browserify = {
  entry: config.src + '/js/app.js',
  dest: config.dist + '/js',
  name: 'app.js'
};

/*
|--------------------------------------------------------------------------
| Browserify Configuration
|--------------------------------------------------------------------------
|
| Used for typescript and browserify mode.
|
| - shim
|     Use libraries with browserify that don't support it
|     or if they are not loaded via npm.
|
| - aliases
|     You can set alias which will be replaced when
|     requiring with browserify.
*/
config.browserify.shim = {
  /**
   *  './src/vendor/flowplayer-6.0.4/flowplayer.min.js': {
   *    'expose': 'flowplayer'         // what the package exposes
   *    'exports': 'fp'                // export it globally
   *    'depends': {                   // dependencies that could be defined
   *      'jQuery': 'jQuery'           // in this shim as well
   *    }
   *  }
  */
};

config.browserify.aliases = {
  verbose: false,
  aliases: {
    // "d3": "./vndr/d3.js" // The example would replace require('d3')
                            // within src/js, with ./../../vndr/d3.js
  }
};


/*
|--------------------------------------------------------------------------
| LESS Configuration
|--------------------------------------------------------------------------
|
| Define the source and destination path, as well as the
| concatinated file name.
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
| concatinated file name.
|
*/
config.index = {
  src: config.src + '/index.html',
  dest: config.dist,
  name: 'index.html'
}


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
}


/*
|--------------------------------------------------------------------------
| Copy Configuration
|--------------------------------------------------------------------------
|
| Define additional files that should be copied.
|
*/
config.copy =  [
  {
    base: '/less/images',
    src: [
      '/**/*'
    ],
    dest: '/css/images'
  },
  {
    base: '/less/fonts',
    src: [
      '/**/*'
    ],
    dest: '/css/fonts'
  }
];


module.exports = config;
