/// <reference path="../../typings/browser.d.ts" />

import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ExceptionHandler } from '@angular/core/src/facade/exception_handler';
import { AppExceptionHandler } from './facades/exception_handler';
import { AppComponent } from './components/app/app.component';

console.log('production');

import { enableProdMode } from '@angular/core';
enableProdMode();

let productionProviders: any[] = [];

productionProviders = [
  provide(ExceptionHandler, { useClass: AppExceptionHandler })
];

bootstrap(AppComponent, [
  productionProviders
]).catch(err => console.error(err));
