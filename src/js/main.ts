/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="../../typings/browser.d.ts" />

import { bootstrap } from 'angular2/platform/browser';
import { AppComponent } from './components/app/app.component';

/* @if config.env='production' **
  import { enableProdMode } from 'angular2/core';
  enableProdMode();
/* @endif */

bootstrap(AppComponent, []).catch(err => console.error(err));
