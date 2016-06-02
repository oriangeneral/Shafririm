# HUE - Angular2 Music Quiz

You may also want to have a look at the following packages, which were created just for this project:

- [css-animator](https://github.com/fabianweb/css-animator)
- [gulp-ng2-relative-path](https://github.com/fabianweb/gulp-ng2-relative-path)
- [node-exec-promise](https://github.com/fabianweb/node-exec-promise)
- [node-require-fallback](https://github.com/fabianweb/node-require-fallback)

# Quickstart

```sh
$ git clone git@github.com:fabianweb/hue.git
$ cd hue
$ npm install -g gulp typings jspm
$ typings install
$ npm install
$ jspm install
$ gulp build
$ npm start
```

# Live Example

[https://hueapp.herokuapp.com/](https://hueapp.herokuapp.com/)

> Since the app is hosted on a free Heroku instance, it may need some time for it to boot.

# Documentation

## CLI

### `npm` and `jspm`

We use npm and jspm (currently `0.17.0-beta.16`) to install dependencies.  
We just need [gulp](http://gulpjs.com), [typings](https://github.com/typings/typings) and [jspm](http://jspm.io) to be installed globally, by using the `-g` flag.

> Make sure that you have [Node.js](https://nodejs.org/) installed, [npm](http://npmjs.com) comes
> with it. You can check with `node --version`.

To install **development dependencies**, used e.g. in gulp tasks use:

```sh
$ npm install --save-dev module-name
```

To install **application dependencies**, used on the server side use:

```sh
$ npm install --save module-name
```

To install **client side dependencies**, use jspm:

```sh
$ jspm install modulename
```

> jspm also supports `install npm:modulename` and `install github:user/repo`

To **start the sever** type:

```sh
$ npm start
```

> The server will be started with the `dist` directory as root, and a built version
> of the app will be used. Make sure to run `gulp build` or `gul dev-build` first.

To **start a development server** type:

```sh
$ npm start dev
```

> The server will be started on the very top level of the application code.
> All files (including dependencies) are transpiled on-demand in the browser.
> While developing, make sure `gulp watch` is running, to pick up index.html and
> less-files changes.

### Gulp Tasks - `gulp`

#### Production Build

The production build should be used, to compile the app for **deployment**.
It will do it's best to keep the target files as small as possible.

```sh
$ gulp build
```

#### Development Build

A development build performs almost the same tasks as a production build, but
may be faster.

```sh
$ gulp dev-build
```

#### Watch Changes

To make it easier and, most important, faster to compile changes use the
watch task. It will perform only tasks to provide files, the dev-server needs
processed (like compiling to JavaScript and CSS).

```sh
$ gulp watch
```

> You may also execute `gulp watch-build` to perform those actions only once.

### Typings - `typings`

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

## Configuration

This section covers how to configure the build tasks, the server and
the application itself.

### Build Configuration - `config.js`

You can set some configuration for TypeScript in `tsconfig.json` and in
`tslint.json`. All other configuration can be found in `config.js`.

Please take a closer look at the `config.js` file comment's on the configuration
properties for more detailed explanations.

#### config.src

Type: `String`  

The folder, where the source files can be found, e.g. `./src` (no trailing slash!).

#### config.dist

Type: `String`  

The folder, where the built app will go to. Again, do not use a trailing slash.

> *dist* is short for *distribution*.

#### config.watch

Type: `String|Array<String>`

Define which files should or shouldn't be watched, when using `gulp watch`.
You can use the [globbing pattern](https://www.npmjs.com/package/minimatch) here.

#### config.jspm

Type: `Object`  

This configuration holds the command, that will be executed later via gulp when building the application.
You can type `jspm` in the command line to see all available options.

jspm internally uses the [SystemJS](https://github.com/systemjs/systemjs) [builder](https://github.com/systemjs/builder).

#### config.less

Type: `Object`  

Configure the [less](http://lesscss.org) gulp task, to create CSS files
from LESS files.

#### config.tslint

Type: `Object`

Define a globbing pattern, which TypeScript files to lint for errors.

#### config.index

Type: `String`  

Define the index file for the application.

#### config.assets

Type: `Object`  

Files to copy without further processing.


#### config.copy

Type: `Array<Object>`  

Files to copy into a desired location, but only preserve the path from the set `base`.

### Server Configuration - `server/index.js`

You can set environment variables in `server/.env` (not included in this repo).
Copy `server/.env.example` and rename it to `.env`.  

Other options are set in `server/config/app.js` for a production server, or
`/server.config/app.dev.js` for a development server.

### Application Configuration

Note, that the index.html is **not** inside the `src`, but on the very top level
of the application code.

> The `index.html` is processed by
> [gulp-preprocess](https://github.com/jas/gulp-preprocess).  

For the dev server or a dev build, `src/js/main.dev.ts`
will be used. For a production build, `src/js/main.prod.ts` is the entry point of the app.
