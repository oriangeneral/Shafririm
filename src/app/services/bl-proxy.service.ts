import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class BlProxyService {
  private baseUrl: string = 'http://192.168.1.213/shafririm/api/';

  constructor(private httpClient: HttpClient) {
  }

  get<T>(entityType: string, id: number): Observable<T> {
    return <Observable<T>>this.httpClient.get(this.getUrl(entityType, id));
  }

  getAll<T>(entityType: string): Observable<T[]> {
    return <Observable<T[]>> this.httpClient.get(this.getUrl(entityType));
  }

  post<T>(entityType: string, data: T) {
    return this.httpClient.post(this.getUrl(entityType), data);
  }

  delete<T>(entityType: string, id: number) {
    return this.httpClient.delete(this.getUrl(entityType, id));
  }

  private getUrl(entityType: string, id: number = null): string {
    let result = this.baseUrl + entityType;
    if (id) {
      result += '/' + id;
    }
    return result;
  }
}
