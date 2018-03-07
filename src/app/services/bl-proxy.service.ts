import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class BlProxyService {
  private baseUrl: string = 'http://192.168.1.39/ShafririmWebapi/api';
  private headers;
  constructor(private httpClient: HttpClient) {

    this.headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
  }


  get<T>(entityType: string, id: number): Observable<T> {
    return <Observable<T>>this.httpClient.get(this.getUrl(entityType, id));
  }

  getNested<T>(entityTypeIds: any): Observable<T> {
    let finalUrl = '';
    Object.keys(entityTypeIds).forEach((entityType) => {
        if (!entityTypeIds[entityType]) {
          finalUrl += '/' + entityType;
        } else {
          finalUrl += '/' + entityType + '/' + entityTypeIds[entityType];
        }
    });
    return <Observable<T>>this.httpClient.get(this.baseUrl + finalUrl);
  }

  getAll<T>(entityType: string): Observable<T[]> {
    return <Observable<T[]>> this.httpClient.get(this.getUrl(entityType));
  }

  post<T>(entityType: string, data: T) {
    return this.httpClient.post(this.getUrl(entityType), data, this.headers);
  }

  delete<T>(entityType: string, id: number) {
    return this.httpClient.delete(this.getUrl(entityType, id));
  }

  private getUrl(entityType: string, id: number = null): string {
    let result = this.baseUrl + '/' + entityType;
    if (id) {
      result += '/' + id;
    }
    return result;
  }
}
