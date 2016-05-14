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
var quiz_service_1 = require('../../services/quiz.service');
var common_1 = require('../../helpers/common');
var QuestionsComponent = (function () {
    function QuestionsComponent(_quizService) {
        this._quizService = _quizService;
        this._questions = [];
        this._activeQuestion = null;
    }
    QuestionsComponent.prototype.addQuestion = function (question) {
        if (this.questions.length === 0) {
            question.active = true;
            question.hidden = false;
            this._activeQuestion = question;
        }
        question.number = this.questionsCount + 1;
        this.questions.push(question);
    };
    QuestionsComponent.prototype.activateQuestion = function (question) {
        var _this = this;
        if (question === this._activeQuestion) {
            return;
        }
        var hideAnimationOptions;
        var showAnimationOptions;
        if (question.number > this._activeQuestion.number) {
            hideAnimationOptions = { type: 'fadeOutLeft' };
            showAnimationOptions = { type: 'fadeInRight' };
        }
        else {
            hideAnimationOptions = { type: 'fadeOutRight' };
            showAnimationOptions = { type: 'fadeInLeft' };
        }
        this._activeQuestion.active = false;
        if (this._activeQuestion) {
            this._activeQuestion
                .hide(hideAnimationOptions)
                .then(function (element) {
                return element;
            }, function (error) {
                // Aborted
            });
        }
        // Pick up changes
        setTimeout(function () {
            _this._activeQuestion = question;
            question.active = true;
            question.show(showAnimationOptions)
                .then(function (element) {
                return element;
            }, function (error) {
                // Aborted
            });
        });
    };
    QuestionsComponent.prototype.activateQuestionByNumber = function (number) {
        if (number > this.questionsCount || number < 1) {
            return;
        }
        this.activateQuestion(this.getQuestion(number));
    };
    QuestionsComponent.prototype.getQuestion = function (number) {
        if (number > this.questionsCount || number < 1) {
            return null;
        }
        return this.questions[number - 1];
    };
    QuestionsComponent.prototype.nextQuestion = function () {
        if (!this.hasNextQuestion()) {
            return;
        }
        this.activateQuestionByNumber(this.activeQuestion.number + 1);
    };
    QuestionsComponent.prototype.previousQuestion = function () {
        if (!this.hasPreviousQuestion()) {
            return;
        }
        this.activateQuestionByNumber(this.activeQuestion.number - 1);
    };
    QuestionsComponent.prototype.hasNextQuestion = function () {
        return (this.activeQuestion.number + 1 <= this.questionsCount);
    };
    QuestionsComponent.prototype.hasPreviousQuestion = function () {
        return (this.activeQuestion.number - 1 > 0);
    };
    QuestionsComponent.prototype.totalQuestions = function () {
        return this.questions.length;
    };
    QuestionsComponent.prototype.questionsToCreate = function () {
        var arr = [];
        common_1.times(this.quizService.totalQuestions, function (i) { return arr.push(i); });
        return arr;
    };
    Object.defineProperty(QuestionsComponent.prototype, "activeQuestion", {
        get: function () {
            return this._activeQuestion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionsComponent.prototype, "questionsCount", {
        get: function () {
            return this._questions.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionsComponent.prototype, "quizService", {
        get: function () {
            return this._quizService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionsComponent.prototype, "questions", {
        get: function () {
            return this._questions;
        },
        enumerable: true,
        configurable: true
    });
    QuestionsComponent = __decorate([
        core_1.Component({
            selector: 'questions',
            templateUrl: './questions.html',
            styleUrls: ['./questions.less']
        }),
        __param(0, core_1.Inject(quiz_service_1.QuizService))
    ], QuestionsComponent);
    return QuestionsComponent;
}());
exports.QuestionsComponent = QuestionsComponent;
