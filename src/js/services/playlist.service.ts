import 'rxjs/add/operator/map';
import 'rxjs/add/operator/cache';
import 'rxjs/add/operator/catch';

import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import { Album } from '../models/album';

@Injectable()
export class PlaylistService {

  private _apiUrl = 'api/playlist/random';

  private _playlist: Playlist;
  private _tracks: Array<Track> = [];

  constructor(private http: Http) { }

  set tracks(t: Track[]) {
    this._tracks = t;
  }

  get tracks(): Track[] {
    return this._tracks;
  }

  get playlist(): Playlist {
    return this._playlist;
  }

  public getPlaylist(): Observable<any> {
    return this.http.get(this._apiUrl)
      .map(this.extractData)
      .map(this.transformData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    return res.json() || {};
  }

  private transformData(data: Playlist) {

    this._playlist = data;
    let tracks: Track[] = [];

    try {
      let items = data.tracks.items;
      items.forEach((val, key) => {
        tracks.push(val.track);
      });
      this.tracks = tracks;
    } catch (e) {
      throw new Error('Wrong playlist format, could not find any tracks! ' + e);
    }

    // TODO: Remove after evaluation
    console.groupCollapsed('Extracted Tracks');
    console.log(this.tracks);
    console.groupEnd();

    return this.playlist;
  }

  private handleError(error: any) {
    let errMsg = error.message || 'Error requesting playlist.';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
