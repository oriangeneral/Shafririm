var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

var tokenExpiry = new Date();
var accessToken = null;

function getAccessToken() {
  if (accessToken === null || new Date(tokenExpiry.getTime() + 30 * 10) >= new Date()) {
    return new Promise(function(resolve, reject) {
      spotifyApi.clientCredentialsGrant()
        .then(function(data) {
          resolve(data.body['access_token']);
        }, function(err) {
          reject(err);
        });
    });
  }

  return Promise.resolve(accessToken);
}

function getFeaturedPlaylists(limit, offset, country, locale, timestamp) {
  return getAccessToken()
    .then(function(token) {
      spotifyApi.setAccessToken(token);
      return spotifyApi.getFeaturedPlaylists({
          limit: limit || 20,
          offset: offset || 0,
          country: country || 'AT',
          locale: locale || 'en_US',
          timestamp: timestamp || (new Date()).toISOString()
        });
    });
}

function getPlaylist(userId, playlistId) {
  return spotifyApi.getPlaylist(userId, playlistId);
}

function getRandomPlaylist(country) {
  return getFeaturedPlaylists(20, 0, country, 'en_US')
    .then(function(response) {
      var randomItem = getRrandomItem(response.body.playlists.items);
      var playlistId = randomItem.id;
      var userId = randomItem.owner.id;
      return getPlaylist(userId, playlistId);
    }).then(function(data) {
      return data;
    });
}

function getRrandomItem(items) {
  return items[Math.floor(Math.random()*items.length)];
}

module.exports = {
  getRandomPlaylist: getRandomPlaylist
};
