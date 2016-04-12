/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="../../typings/browser.d.ts" />

import { provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { ExceptionHandler } from 'angular2/src/facade/exception_handler';
import { AppExceptionHandler } from './facades/exception_handler';
import { AppComponent } from './components/app/app.component';

/* @if config.env='production' **
  import { enableProdMode } from 'angular2/core';
  enableProdMode();
/* @endif */

let productionProviders: any[] = [];
/* @if config.env='production' **
  productionProviders = [
    provide(ExceptionHandler, { useClass: AppExceptionHandler })
  ];
/* @endif */

bootstrap(AppComponent, [
  productionProviders
]).catch(err => console.error(err));
