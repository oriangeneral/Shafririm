"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var css_animator_1 = require('css-animator');
var landing_component_1 = require('../landing/landing.component');
var quiz_component_1 = require('../quiz/quiz.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            styleUrls: ['./app.less'],
            templateUrl: './app.html',
            directives: [
                router_1.ROUTER_DIRECTIVES
            ],
            providers: [
                router_1.ROUTER_PROVIDERS,
                css_animator_1.AnimationService
            ]
        }),
        router_1.RouteConfig([
            {
                path: '/',
                name: 'Landing',
                component: landing_component_1.LandingComponent,
                useAsDefault: true
            },
            {
                path: '/quiz',
                name: 'Quiz',
                component: quiz_component_1.QuizComponent
            }
        ])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
