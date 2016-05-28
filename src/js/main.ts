// /// <reference path="../../typings/browser.d.ts" />

import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ExceptionHandler } from '@angular/core/src/facade/exception_handler';
import { AppExceptionHandler } from './facades/exception_handler';
import { AppComponent } from './components/app/app.component';
// import "angular2-materialize";

// /* @if config.env='production' **
//   import { enableProdMode } from '@angular/core';
//   enableProdMode();
// /* @endif */

let productionProviders: any[] = [];
// /* @if config.env='production' **
//   productionProviders = [
//     provide(ExceptionHandler, { useClass: AppExceptionHandler })
//   ];
// /* @endif */

bootstrap(AppComponent, [
  productionProviders
]).catch(err => console.error(err));
