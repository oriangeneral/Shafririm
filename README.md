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

### `mode` (string)

Choose whether you want to bundle foles or not.

- lazy
      Files will be concatinated to a single file (+1 vendor file).

- bundle
      Only vendor files will be bundled, your app files will be lazy loaded.

### `src` (string)

The folder, where the source files can be found, e.g. `./src` (no trailing slash!).

### `dist` (string)

The folder, where the built app will go to. Again, do not use a trailing slash.

> *dist* is short for *distribution*.

### `watch` (string|array)

Define which files should or shouldn't be watched, when using `gulp watch`.
You can use the [globbing pattern](https://www.npmjs.com/package/minimatch) here.

### `systemjs` (object)

Here we will configure [SystemJS](https://github.com/systemjs/systemjs),
the module loader used for the application.

- config (object)
      Please refer to the
      [SystemJS documentation](https://github.com/systemjs/systemjs/tree/master/docs)
      for setting this property.

### `ts` (object)

Configure the TypeScript gulp task.

> Please note, that the compiler configuration is set in `tsconfig.json`.

- appBase (string)
      This is the path of your JavaScript app **absolute from the dist folder**.
      It *must* look something like this: `/app` (no trailing slash!).

- src (string|array)
      Globbing pattern to define all TypeScript files relative to `gulpfile.js`

- base (string)
      Similar to src, but only the base directory.

- entry (string)
      The entry point (single file), where the TypeScript compiler will start.

- dest (string)
      The destination where to save the compiled JavaScript files.

- name (string)
      The name of the file, if bundling is used instead of lazy for `mode`.

> From now almost all `src` properties will support a string or an array. Please
> refer to the `config.js` default values to learn more about how to provide
> the correct values.
> Also options like `dest` (for destination) are the same or very similar
> than explained above.

### `less` (object)

Configure the [less](http://lesscss.org) gulp task, to create CSS files
from LESS files.

- src (string)
      No globbing supported.

- dest (string)

- name (string)

### `index` (object)

Define the index file for the application.

- src (string)
      No globbing supported.

- dest (string)

- name (string)

### `icons` (object)

This task takes SVG files, creates an icon font out of it and a CSS
file to easily use them within the app.

- name (string)
      The name of the final CSS file.

- src (string|array)
      Must match the filename used `cssDest`.

- dest (string)

- cssDest (string)
      Destination of the CSS file. This path must be relative to `dest`.

- fontDest (string)
      Destination of the icon-font files. Must be relative to `cssDest`.

- templatePath (string)
      Path to a template, used to create the CSS file.

- fontName (string)

- cssClass (string)

### `vendor` (object)

For faster builds, vendor files are only bundled into a single file,
but not compiled by TypeScript. You can define those files here.

- dest (string)

- name (string)

- files (array)
  - base (string)
        Define the base path of the vendor files, used in `src` or `devSrc`.

  - src (array)
        Define the paths and file names, relative to `base`, beginning with a slash.

  - devSrc (array)
        If this property is set it will be used instead of `src`in a development build.

### `assets` (object)

Files to copy without further processing.

- src (string|array)

- dest (string)


### `copy` (array)

Files to copy into a desired location, but only preserve the path from the set `base`.

- base (string)
      Only preserve the path in the location from the end of this path.

- src (string|array)

- dest (string)

## Server Configuration - `server/index.js`

You can set environment variables in `server/.env` (not included in this repo).
Copy `server/.env.example` and rename it to `.env`.

> Documentation for this chapter will be added in the future.

# Application

The `index.html` and all TypeScript files are processed by
[gulp-preprocess](https://github.com/jas/gulp-preprocess).

> Documentation for this chapter will be added in the future.
