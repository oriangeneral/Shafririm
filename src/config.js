(function(global) {
  var config = {
    defaultJSExtensions: true,

    transpiler: 'typescript',

    typescriptOptions: {
      "target": "ES5",
      "module": "system",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      // "moduleResolution": "node",
      "noImplicitAny": true,
      "suppressImplicitAnyIndexErrors": true
    }
  };

  config.map = {
    'typescript': 'node_modules/typescript/lib/typescript',
    'app': 'src/js',
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular',
    'css-animator': 'node_modules/css-animator'
  };

  config.packages = {
    'app': {
      main: 'main',
      defaultExtension: 'ts'
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
    config.packages[pkgName] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
  });

  if (global.filterSystemConfig) {
    global.filterSystemConfig(config);
  }

  System.config(config);
})(this);
