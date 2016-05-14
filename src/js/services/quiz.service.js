"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var core_1 = require('angular2/core');
var QuizService = (function () {
    function QuizService(playlistService) {
        var _this = this;
        this.playlistService = playlistService;
        this._totalQuestions = 0;
        this.playlistService.getPlaylist().subscribe(function (playlist) { return _this._totalQuestions = 5; }, function (error) { return console.error(error); });
    }
    Object.defineProperty(QuizService.prototype, "totalQuestions", {
        get: function () {
            return this._totalQuestions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuizService.prototype, "questionsComponent", {
        get: function () {
            return this._questionsComponent;
        },
        set: function (questionsComponent) {
            this._questionsComponent = questionsComponent;
        },
        enumerable: true,
        configurable: true
    });
    QuizService = __decorate([
        core_1.Injectable()
    ], QuizService);
    return QuizService;
}());
exports.QuizService = QuizService;
