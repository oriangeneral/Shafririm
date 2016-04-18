"use strict";

var SpotifyWebApi = require('spotify-web-api-node');

class Spotify {
  constructor() {
    let self = this;
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    this.accessToken = null;

    this.api = new SpotifyWebApi({
      clientId: self.clientId,
      clientSecret: self.clientSecret,
      redirectUri: self.redirectUri
    });
  }

  isTokenValid() {
    let tokenTo = this.tokenTimeout || Date.now() - 3600;
    let d = new Date();
    let to = new Date(tokenTo);
    return to > d;
  }

  fetchToken() {
    let self = this;
    return new Promise((resolve, reject) => {
      if (self.accessToken === null || !self.isTokenValid()) {
        self.api.clientCredentialsGrant()
        .then(d => {
          self.accessToken = d.body['access_token'];
          self.tokenTimeout = Date.now() + 3500;      // Initially keep 100ms buffer before timeout
          self.api.setAccessToken(d.body['access_token']);
          resolve(d.body['access_token']);
        })
        .catch(e => reject("Error while fetching access token: " + e));
      } else {
        resolve(self.accessToken);
      }
    });
  }

  fetchRandomPlaylists(country, locale, limit, offset, timestamp) {
    country = country === null || !country ? 'US' : country.toUpperCase();
    locale = locale || "en_US";
    limit = limit || 20;
    offset = offset || 0;
    timestamp = timestamp || new Date();
    timestamp = new Date(timestamp).toISOString();

    let self = this;
    return new Promise((resolve, reject) => {
      self.fetchToken()
      .then(d => {
        self.api.getFeaturedPlaylists({
          country: country,
          locale: locale,
          limit: limit,
          offset: offset,
          timestamp: timestamp
        })
        .then(d => resolve(d.body))
        .catch(e => reject("Error while fetching playlist: " + e));
      })
      .catch(e => reject(e));
    });
  }
}

module.exports = {
  spotify: new Spotify()
}
