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
var card_component_1 = require('../../card/card.component');
var questions_component_1 = require('../questions.component');
var QuestionComponent = (function () {
    function QuestionComponent(_elementRef, _questionsComponent) {
        this._elementRef = _elementRef;
        this._questionsComponent = _questionsComponent;
        this._active = false;
        this._wasActive = false;
        this._hidden = true;
        this._number = 0;
        this.questionsComponent.addQuestion(this);
    }
    QuestionComponent.prototype.show = function (options) {
        this._hidden = false; // To actually see the animation
        return this._cardComponent.show(options)
            .then(function (element) {
            return element;
        }, function (error) {
            // Animation interrupted
        });
    };
    QuestionComponent.prototype.hide = function (options) {
        var _this = this;
        this._hidden = false;
        return this._cardComponent.hide(options)
            .then(function (element) {
            _this._hidden = true;
            return element;
        }, function (error) {
            // Animation interrupted
        });
    };
    Object.defineProperty(QuestionComponent.prototype, "questionsComponent", {
        get: function () {
            return this._questionsComponent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionComponent.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (active) {
            this._wasActive = this._active;
            this._active = active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionComponent.prototype, "wasActive", {
        get: function () {
            return this._active;
        },
        set: function (wasActive) {
            this._wasActive = wasActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionComponent.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (hidden) {
            this._hidden = hidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionComponent.prototype, "number", {
        get: function () {
            return this._number;
        },
        set: function (number) {
            this._number = number;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(card_component_1.CardComponent)
    ], QuestionComponent.prototype, "_cardComponent");
    QuestionComponent = __decorate([
        core_1.Component({
            selector: 'question',
            templateUrl: './question.html',
            styleUrls: ['./question.less'],
            directives: [
                router_1.RouterLink,
                card_component_1.CardComponent
            ]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(questions_component_1.QuestionsComponent))
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
