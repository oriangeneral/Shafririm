"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('rxjs/add/operator/map');
require('rxjs/add/operator/cache');
require('rxjs/add/operator/catch');
var core_1 = require('angular2/core');
var Observable_1 = require('rxjs/Observable');
var PlaylistService = (function () {
    function PlaylistService(http) {
        this.http = http;
        this._apiUrl = 'api/playlist/random';
    }
    PlaylistService.prototype.getPlaylist = function () {
        return this.http.get(this._apiUrl)
            .map(this.extractData)
            .map(this.transformData)
            .catch(this.handleError);
    };
    PlaylistService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        return res.json() || {};
    };
    PlaylistService.prototype.transformData = function (data) {
        console.groupCollapsed('API Resonse');
        console.log(data);
        console.groupEnd();
        return data;
    };
    PlaylistService.prototype.handleError = function (error) {
        var errMsg = error.message || 'Error requesting playlist.';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    PlaylistService = __decorate([
        core_1.Injectable()
    ], PlaylistService);
    return PlaylistService;
}());
exports.PlaylistService = PlaylistService;
