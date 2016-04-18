"use strict";

var router = require('express').Router();
var spotify = require('../services/spotify');
var sptfy = require('../controller/spotify').spotify;

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

router.get('/getplaylist', function(req, res) {


  sptfy.fetchRandomPlaylists()
  .then(d => res.json(d))
  .catch(err => {
    let error = isObject(err) ? err : { message: err };
    let statusCode = err && err.statusCode ? err.statusCode : 500;

    error.name = error.name || 'HueapiError';
    error.message = error.message || 'Whoops, something went wrong. That\'s all we know :(';
    error.statusCode = error.statusCode || statusCode;

    res.status(statusCode).json({
      error: error
    });
  });
});

module.exports = router;
