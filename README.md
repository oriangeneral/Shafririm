# HUE - Music Quiz

You may also want to have a look at
[gulp-ng2-relative-path](https://github.com/fabianweb/gulp-ng2-relative-path),
which was created just for this project.  

More documentation will be added once we've decided for a good structure. For now please take a look at how to get the app running within seconds:

# Quickstart

```sh
$ git clone git@github.com:fabianweb/hue.git
$ cd hue
$ npm install -g gulp typings
$ typings install
$ npm install
$ gulp build
$ npm start
```

# CLI

## Node Package Manager - `npm`

We use npm to install dependencies and to bring up a server.  
We just need [gulp](http://gulpjs.com) and [typings](https://github.com/typings/typings) to be installed globally, by using the `-g` flag.

> Make sure that you have [Node.js](https://nodejs.org/) installed, [npm](http://npmjs.com) comes
> with it. You can check with `node --version`.

To install **development dependencies**, used in gulp tasks use:

```sh
$ npm install --save-dev module-name
```

To install **application dependencies**, used on the client side or for the server use:

```sh
$ npm install --save module-name
```

To **start the sever** type:

```sh
$ npm start
```

## Gulp Tasks - `gulp`

### Production Build

The production build should be used, to compile the app for **deployment**.
It will do it's best to keep the target files as small as possible.

```sh
$ gulp dev-build
```

### Development Build

A development build performs almost the same tasks as a production build, but
**debugging** the application is a lot easier.

```sh
$ gulp dev-build
```

### Watch Changes

To make it easier and, most important, faster to compile changes use the
watch task. It will perform a dev-build on the first run, but will
execute only some tasks (like compiling to JavaScript and CSS) on
consecutive builds.

```sh
$ gulp watch
```

> You may also execute `gulp watch-build` to execute a very basic build. Files
form a development or production build must already exists in the dist folder.

## Typings - `typings`

Typings are used to tell the [TypeScript](https://www.typescriptlang.org)
compiler about definitions. You can **search** for definitions like this:

```sh
$ typings search es6-shim
```

Installing is as easy as:

```sh
$ typings install es6-shim --ambient --save
```

> Definitions will be referenced automatically in the entry TypeScript file.

# Configuration

You can set some configuration for TypeScript in `tsconfig.json` and in
`tslint.json`. All other configuration can be found in `config.js`.

## Build Configuration - `config.js`

#### config.mode

Type: `String`  

Choose whether you want to bundle foles or not:

- `lazy`
      Files will be concatinated to a single file (+1 vendor file).

- `bundle`
      Only vendor files will be bundled, your app files will be lazy loaded.

#### config.stc

Type: `String`  

The folder, where the source files can be found, e.g. `./src` (no trailing slash!).

#### config.dist

Type: `String`  

The folder, where the built app will go to. Again, do not use a trailing slash.

> *dist* is short for *distribution*.

#### config.watch

Type: `String|Array`

Define which files should or shouldn't be watched, when using `gulp watch`.
You can use the [globbing pattern](https://www.npmjs.com/package/minimatch) here.

#### config.systemjs

Type: `Object`  

We will configure [SystemJS](https://github.com/systemjs/systemjs) here,
the module loader used for the application.

- config `Object`
      Please refer to the
      [SystemJS documentation](https://github.com/systemjs/systemjs/tree/master/docs)
      for setting this property.

#### config.ts

Type: `Object`  

Configure the TypeScript gulp task.

> Please note, that the compiler configuration is set in `tsconfig.json`.

- appBase `String`
      This is the path of your JavaScript app **absolute from the dist folder**.
      It *must* look something like this: `/app` (no trailing slash!).

- src `String|Array`
      Globbing pattern to define all TypeScript files relative to `gulpfile.js`

- base `String`
      Similar to src, but only the base directory.

- entry `String`
      The entry point (single file), where the TypeScript compiler will start.

- dest `String`
      The destination where to save the compiled JavaScript files.

- name `String`
      The name of the file, if bundling is used instead of lazy for `mode`.

> From now almost all `src` properties will support a string or an array. Please
> refer to the `config.js` default values to learn more about how to provide
> the correct values.
> Also options like `dest` (for destination) are the same or very similar
> than explained above.

#### config.less

Type: `Object`  

Configure the [less](http://lesscss.org) gulp task, to create CSS files
from LESS files.

- src `String`
      No globbing supported.

- dest `String`

- name `String`

##### config.index

Type: `String`  

Define the index file for the application.

- src `String`
      No globbing supported.

- dest `String`

- name `String`

##### config.icons

Type: `Object`  

This task takes SVG files, creates an icon font out of it and a CSS
file to easily use them within the app.

- name `String`
      The name of the final CSS file.

- src `String|Array`
      Must match the filename used `cssDest`.

- dest `String`

- cssDest `String`
      Destination of the CSS file. This path must be relative to `dest`.

- fontDest `String`
      Destination of the icon-font files. Must be relative to `cssDest`.

- templatePath `String`
      Path to a template, used to create the CSS file.

- fontName `String`

- cssClass `String`

#### config.vendor

Type: `Object`  

For faster builds, vendor files are only bundled into a single file,
but not compiled by TypeScript. You can define those files here.

- dest `String`

- name `String`

- files `Array<Object>`
  - base `String`
        Define the base path of the vendor files, used in `src` or `devSrc`.

  - src `Array<String>`
        Define the paths and file names, relative to `base`, beginning with a slash.

  - devSrc `Array<String>`
        If this property is set it will be used instead of `src`in a development build.

#### config.assets

Type: `Object`  

Files to copy without further processing.

- src `String|Array<String>`

- dest `String`


#### config.copy

Type: `Array<Object>`  

Files to copy into a desired location, but only preserve the path from the set `base`.

- base `String`
      Only preserve the path in the location from the end of this path.

- src `String|Array<String>`

- dest `String`

## Server Configuration - `server/index.js`

You can set environment variables in `server/.env` (not included in this repo).
Copy `server/.env.example` and rename it to `.env`.

> Documentation for this chapter will be added in the future.

# Application

The `index.html` and all TypeScript files are processed by
[gulp-preprocess](https://github.com/jas/gulp-preprocess).

> Documentation for this chapter will be added in the future.
