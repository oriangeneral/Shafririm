import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/cache';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LocaleService } from './locale.service';

import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import { Album } from '../models/album';

@Injectable()
export class PlaylistService {

  private _apiUrl = 'api/playlist/random';

  constructor(private http: Http, private localeService: LocaleService) {

  }

  public getPlaylist(): Observable<any> {
    console.log(this.localeService.locale);

    return this.http.get(this._apiUrl)
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
