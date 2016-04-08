import { Component, Inject, Input, ElementRef } from 'angular2/core';

import {
AnimationService,
AnimationDirective,
AnimationBuilder,
AnimationOptions
} from '../../services/animation';

@Component({
  selector: 'card',
  templateUrl: './card.html',
  styleUrls: ['./card.less', './card-animations.less'],
  directives: [
    AnimationDirective
  ]
})
export class CardComponent {

  @Input('cardType') public cardType;

  private _animationBuilder: AnimationBuilder;

  constructor(
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(AnimationService) animationService: AnimationService
    ) {
    this._animationBuilder = animationService.builder();
  }

  public show(options: AnimationOptions): Promise<HTMLElement> {
    return this._animationBuilder
      .setOptions(options)
      .show(this._elementRef.nativeElement);
  }

  public hide(options: AnimationOptions): Promise<HTMLElement> {
    return this._animationBuilder
      .setOptions(options)
      .hide(this._elementRef.nativeElement);
  }

}
