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
var css_animator_1 = require('css-animator');
var CardComponent = (function () {
    function CardComponent(_elementRef, animationService) {
        this._elementRef = _elementRef;
        this._animationBuilder = animationService.builder();
        this._defaultShowOptions = { type: 'fadeInRight' };
        this._defaultHideOptions = { type: 'fadeOutLeft' };
    }
    CardComponent.prototype.show = function (options) {
        return this._animationBuilder
            .setOptions(options || this._defaultShowOptions)
            .show(this._elementRef.nativeElement);
    };
    CardComponent.prototype.hide = function (options) {
        return this._animationBuilder
            .setOptions(options || this._defaultHideOptions)
            .hide(this._elementRef.nativeElement);
    };
    __decorate([
        core_1.Input('cardType')
    ], CardComponent.prototype, "cardType");
    CardComponent = __decorate([
        core_1.Component({
            selector: 'card',
            templateUrl: './card.html',
            styleUrls: ['./card.less', './card-animations.less'],
            directives: []
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __param(1, core_1.Inject(css_animator_1.AnimationService))
    ], CardComponent);
    return CardComponent;
}());
exports.CardComponent = CardComponent;
