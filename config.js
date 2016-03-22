var config = config || {};
config.dist = config.dist || {};
config.src = config.src || {};

config.src = 'src';
config.dist = 'dist';

// TODO: filename generator
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

module.exports = config;
