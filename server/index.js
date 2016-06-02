console.log('Starting server...');

var env = require('node-env-file');
var express = require('express')
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var compress = require('compression');
var appConfig = require('./config/app');
var appDevConfig = require('./config/app.dev');
var app = express();

var envFile = __dirname + '/.env';

var config;
if (process.argv.indexOf('dev') !== -1) {
  config = appDevConfig;
} else {
  config = appConfig;
}

console.log('Server public dir set to ' + config.publicDir);

try {
  fs.accessSync(envFile, fs.F_OK)
} catch(e) {
  fs.writeFileSync(envFile, fs.readFileSync(envFile + '.example'));
}

env(__dirname + '/.env');

// Compress responses
app.use(compress());

// Request middleware
app.use(require('./middleware/httpsRedirect'));
app.use(require('./middleware/isFile'));
app.use(express.static(path.join(__dirname, config.publicDir)));

// Routes
app.use(require('./routes/routes'));
app.use('/api', require('./routes/api'));

// Serve index if file does not exist
app.get('*', function(req, res, next) {
    if (!req.isFile) {
        return res.sendFile('index.html', { root: path.join(__dirname, config.publicDir) });
    }

    return next();
});

// Response middleware
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler({
  dumpExceptions: !config.production,
  showStack: !config.production
}));

// SSL certificate
var options = {
    key: fs.readFileSync('./server/ssl/server.key'),
    cert: fs.readFileSync('./server/ssl/server.crt')
};

// Create a HTTP2 server
require('spdy').createServer(options, app).listen(config.production ? 443 : 5000);

// Create HTTP server for redirecting
require('http').createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(config.production ? 80 : 5001);

console.log('Server listening at https://localhost:5000');
console.log('');
