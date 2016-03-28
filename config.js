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
| TypeScript Configuration
|--------------------------------------------------------------------------
|
| Define the source and destination path, as well as the
| concatinated file name.
|
| Please note, that some configuration is set within tsconfig.json!
|
*/
config.ts = {
    src: config.src + '/js/**/*.ts',
    entry: config.src + '/js/main.ts',
    dest: config.dist + '/js',
    name: 'app.js'
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
| Vendor Files
|--------------------------------------------------------------------------
|
| For faster builds, vendor files are only bundled into a single file,
| but not compiled by TypeScript.
|
*/
config.vendor = {
        dest: config.dist + '/js/vendor',
        files: [{
            base: './node_modules/systemjs/dist',
            src: [
                '/system.js'
                //'/system-register-only.js'
            ]
        }, {
            base: './node_modules/rxjs/bundles',
            src: [
                '/Rx.min.js'
            ]
        }, {
            base: './node_modules/zone.js/dist',
            src: [
                '/zone.min.js'
            ]
        }, {
            base: './node_modules/reflect-metadata',
            src: [
                '/Reflect.js'
            ]
        }, {
            base: './node_modules/angular2/bundles',
            src: [
                '/angular2.min.js',
                '/router.min.js'
            ]
        }]
    },

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
config.copy = [{
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
