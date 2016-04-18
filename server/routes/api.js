var router = require('express').Router();
var spotify = require('../services/spotify');

// define middleware and routes here

router.get('/random-playlist/:country?', function (req, res) {
  spotify.getRandomPlaylist(req.params.country || 'US')
    .then(function(playlist) {
      res.send(playlist);
    }, function(err) {
      res.status(500).send({
        error: err || 'Whoops, something went wrong. That\'s all we know :(',
        status_code: 500
      });
    });
});

module.exports = router;
