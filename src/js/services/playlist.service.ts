import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// import { Observable } from 'rxjs/Observable' => Observable undefined
import RxObservable from 'rxjs/Observable';
const Observable = RxObservable.Observable;

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import LocaleService from './locale.service';

import Playlist from 'app/models/playlist';
import Track from 'app/models/track';
import Album from 'app/models/album';

@Injectable()
export class PlaylistService {

  private _apiUrl = '/api/playlist/random';

  constructor(private http: Http, private localeService: LocaleService) {

  }

  public getPlaylist(): Observable<any> {
    let requestUrl = this._apiUrl;

    if (this.localeService.locale && this.localeService.locale.value) {
      requestUrl += '?country=' + this.localeService.locale.value;
    }

    return this.http.get(requestUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }

    return res.json() || {};
  }

  private handleError(error: any) {
    let errMsg = error.message || 'Error requesting playlist.';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

export default PlaylistService;
