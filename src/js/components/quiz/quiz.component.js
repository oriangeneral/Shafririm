"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var playlist_service_1 = require('../../services/playlist.service');
var quiz_service_1 = require('../../services/quiz.service');
var questions_component_1 = require('../questions/questions.component');
var question_component_1 = require('../questions/question/question.component');
var QuizComponent = (function () {
    function QuizComponent(_quizService) {
        this._quizService = _quizService;
    }
    QuizComponent.prototype.ngAfterViewInit = function () {
        this.quizService.questionsComponent = this.questionsComponent;
    };
    Object.defineProperty(QuizComponent.prototype, "quizService", {
        get: function () {
            return this._quizService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuizComponent.prototype, "questionsComponent", {
        get: function () {
            return this._questionsComponent;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(questions_component_1.QuestionsComponent)
    ], QuizComponent.prototype, "_questionsComponent");
    QuizComponent = __decorate([
        core_1.Component({
            selector: 'quiz',
            templateUrl: './quiz.html',
            styleUrls: ['./quiz.less'],
            directives: [
                router_1.RouterLink,
                questions_component_1.QuestionsComponent,
                question_component_1.QuestionComponent
            ],
            providers: [
                http_1.HTTP_PROVIDERS,
                playlist_service_1.PlaylistService,
                quiz_service_1.QuizService
            ]
        }),
        __param(0, core_1.Inject(quiz_service_1.QuizService))
    ], QuizComponent);
    return QuizComponent;
}());
exports.QuizComponent = QuizComponent;
