var config = config || {};
config.dist = config.dist || {};
config.src = config.src || {};

config.src = 'src';
config.dist = 'dist';

config.watch = ['src/**/*', '!src/assets/**/*'];

config.js = {
  src: config.src + '/js/**/*.js',
  dest: config.dist + '/js',
  name: 'app.js'
};

config.css = {
  src: config.src + '/css/app.less',
  dest: config.dist + '/css',
  name: 'app.css'
};

config.index = {
  src: config.src + '/index.html',
  dest: config.dist,
  name: 'index.html'
}

config.assets = {
  src: config.src + '/assets/**/*',
  dest: config.dist + '/assets'
}

module.exports = config;
