import 'rxjs/add/operator/map';
import 'rxjs/add/operator/cache';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlaylistService {

  private _apiUrl = 'api/playlist/random';

  constructor(private http: Http) { }

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

  private transformData(data: any) {
    console.groupCollapsed('API Resonse');
    console.log(data);
    console.groupEnd();
    return data;
  }

  private handleError(error: any) {
    let errMsg = error.message || 'Error requesting playlist.';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
