var router = require('express').Router();
var spotify = require('../services/spotify');

// define middleware and routes here

function isObject(item) {
  return (typeof item === "object" && !Array.isArray(item) && item !== null);
}

router.get('/random-playlist/:country?', function(req, res) {
  spotify.getRandomPlaylist(req.params.country || 'US')
    .then(function(playlist) {
      res.send(playlist);
    }, function(err) {
      var error = isObject(err) ? err : {};
      var statusCode = err && err.statusCode ? err.statusCode : 500;

      error.name = error.name || 'HueapiError';
      error.message = error.message || 'Whoops, something went wrong. That\'s all we know :(';
      error.statusCode = error.statusCode || statusCode;

      res.status(statusCode).send({
        error: error
      });
    });
});

module.exports = router;
