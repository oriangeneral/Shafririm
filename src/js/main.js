/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="../../typings/browser.d.ts" />
"use strict";
var browser_1 = require('angular2/platform/browser');
var app_component_1 = require('./components/app/app.component');
require("angular2-materialize");
/* @if config.env='production' **
  import { enableProdMode } from 'angular2/core';
  enableProdMode();
/* @endif */
var productionProviders = [];
/* @if config.env='production' **
  productionProviders = [
    provide(ExceptionHandler, { useClass: AppExceptionHandler })
  ];
/* @endif */
browser_1.bootstrap(app_component_1.AppComponent, [
    productionProviders
]).catch(function (err) { return console.error(err); });
