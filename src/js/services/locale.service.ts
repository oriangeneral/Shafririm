import { Injectable } from '@angular/core';

@Injectable()
export class LocaleService {

  private _locale: string;

  get locale() {
    return this._locale || '';
  }

  set locale(locale) {
    this._locale = locale;
  }

}
