// /// <reference path="../../typings/browser.d.ts" />

import { provide } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ExceptionHandler } from '@angular/core/src/facade/exception_handler';
import { AppExceptionHandler } from './facades/exception_handler';
import { AppComponent } from './components/app/app.component';

import { enableProdMode } from '@angular/core';
enableProdMode();

let productionProviders: any[] = productionProviders = [
  provide(ExceptionHandler, { useClass: AppExceptionHandler }),
  provide(APP_BASE_HREF, { useValue: '/' })
];

bootstrap(AppComponent, [
  productionProviders,
  HTTP_PROVIDERS
]).catch(err => console.error(err));
