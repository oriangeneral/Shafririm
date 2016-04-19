"use strict";

var https = require('https');
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

  getRandomEntry(arr) {
    if (!Array.isArray(arr)) {
      return false;
    }
    let len = arr.length;
    let pos = Math.floor(Math.random() * len);
    return arr[pos];
  }

  createQueryString(obj) {
    if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
      let qs = [];
      for (var key in obj) {
        qs.push(key + "=" + obj[key]);
      }
      return qs.join("&");
    }
    return false;
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

  fetchPlaylistData(user, id) {
    let self = this;
    return new Promise((resolve, reject) => {
      if (!user || !id) {
        reject("Necessary data missing, User: " + user + ", Playlist: " + id);
      }
      self.fetchToken()
      .then(d => {
        return self.api.getPlaylist(user, id);
      })
      .then(d => resolve(d.body))
      .catch(e => reject("Error while fetching playlist data: " + e));
    });
  }

  fetchFeaturedPlaylists(obj) {
    obj = obj || {};
    obj.country = !obj.country ? 'US' : obj.country.toUpperCase();
    obj.locale = obj.locale || "en_US";
    obj.limit = obj.limit || 20;
    obj.offset = obj.offset || 0;
    obj.timestamp = obj.timestamp || new Date();
    obj.timestamp = new Date(obj.timestamp).toISOString();

    let self = this;
    return new Promise((resolve, reject) => {
      self.fetchToken()
      .then(d => self.api.getFeaturedPlaylists({
          country: obj.country,
          locale: obj.locale,
          limit: obj.limit,
          offset: obj.offset,
          timestamp: obj.timestamp
        })
      )
      .then(d => resolve(d.body))
      .catch(e => reject("Error while fetching playlist: " + e));
    });
  }

  fetchSearchedPlaylists(obj) {
    let self = this;
    return new Promise((resolve, reject) => {
      if (!obj || !obj.query ) {
        reject("No search query given...");
      } else {
        obj.q = encodeURIComponent(obj.query);
        obj.limit = obj.limit || 20;
        obj.offset = obj.offset || 0;
        obj.type = "playlist";
        obj.market = !obj.country ? "US" : obj.country.toUpperCase();

        delete(obj.query);
        delete(obj.country);

        let qs = self.createQueryString(obj);
        if (!qs) {
          reject("No valid query given...");
        }

        self.fetchToken()
        .then(d => {
          let opts = {
            protocol: "https:",
            hostname: "api.spotify.com",
            path: "/v1/search?" + qs,
            headers: {
              "Authorization" : "Bearer " + self.accessToken
            }
          }
          let xhr = https.get(opts, res => {
            let data = "";
            res.on('data', d => data += d);
            res.on('end', () => resolve(JSON.parse(data)));
          });
          xhr.on('error', e => reject("Error while retrieving search data: " + e));
        })
        .catch(e => reject(e));
      }
    });
  }


}

module.exports = new Spotify();
