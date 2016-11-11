import { Injectable } from '@angular/core';

@Injectable()
export class LocaleService {

  private _locale: any;

  private localStorageAvailable() {
    if (typeof (Storage) !== "undefined" && localStorage) {
      return true;
    }

    return false;
  }

  get locale() {
    let region = null;

    if (this.localStorageAvailable()) {
      try {
        region = JSON.parse(localStorage.getItem('hue.region'));
      } catch (e) { }
    }

    if (region !== null) {
      this._locale = region;
    }

    return this._locale || '';
  }

  set locale(locale) {
    if (this.localStorageAvailable()) {
      try {
        localStorage.setItem('hue.region', JSON.stringify(locale));
      } catch (e) { }
    }

    this._locale = locale;
  }

}
