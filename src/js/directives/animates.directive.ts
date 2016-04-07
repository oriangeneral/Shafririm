import { Directive, ElementRef, Input, Inject, OnInit } from 'angular2/core';

import { AnimationService } from '../services/animation/animation.service';
import { AnimationBuilder, AnimationOptions } from '../services/animation/animation_builder';

@Directive({
  selector: '[animates]',
  exportAs: 'animation'
})
export class AnimatesDirective implements OnInit {
  @Input('animates') private _options: AnimationOptions;

  private _animationBuilder: AnimationBuilder;


  constructor(
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(AnimationService) private _animationService: AnimationService
    ) {

    this._animationBuilder = this._animationService.builder();
  }

  public ngOnInit() {
    this.initial();
  }

  public start(options: AnimationOptions) {
    this._animationBuilder.setOptions(options).setPlayState('running');
    this._animationBuilder.animate(this._elementRef.nativeElement);
  }

  public initial() {
    if (!this._options) {
      return;
    }

    this._animationBuilder.setOptions(this._options).setPlayState('running');
    this._animationBuilder.animate(this._elementRef.nativeElement);
  }

  public pause() {
    this._animationBuilder
      .applyPlayState(this._elementRef.nativeElement);
  }

  public resume() {
    this._animationBuilder
      .applyPlayState(this._elementRef.nativeElement);
  }

  public toggle() {
    let playState = this._animationBuilder.playState === 'running' ? 'paused' : 'running';

    this._animationBuilder
      .applyPlayState(this._elementRef.nativeElement);
  }

}
