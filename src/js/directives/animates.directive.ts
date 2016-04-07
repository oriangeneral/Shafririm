import { Directive, ElementRef, Input, Inject, OnInit, OnDestroy } from 'angular2/core';

import { AnimationService } from '../services/animation/animation.service';
import { AnimationBuilder, AnimationOptions } from '../services/animation/animation_builder';

@Directive({
  selector: '[animates]',
  exportAs: 'animation'
})
export class AnimatesDirective implements OnInit, OnDestroy {
  @Input('animates') private _defaultOptions: AnimationOptions;
  @Input('animatesOnInit') private _initOptions: AnimationOptions;
  @Input('animatesOnDestroy') private _destroyOptions: AnimationOptions;


  private _animationBuilder: AnimationBuilder;


  constructor(
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(AnimationService) private _animationService: AnimationService
    ) {

    this._animationBuilder = this._animationService.builder();
  }

  public ngOnInit() {
    if (!this._initOptions) {
      return;
    }

    this._animationBuilder.setOptions(this._initOptions).setPlayState('running');
    this._animationBuilder.animate(this._elementRef.nativeElement);
  }

  public ngOnDestroy() {
    if (!this._destroyOptions) {
      return;
    }

    this._animationBuilder.setOptions(this._destroyOptions).setPlayState('running');
    this._animationBuilder.animate(this._elementRef.nativeElement);
  }

  public start(options: AnimationOptions): Promise<HTMLElement> {
    this._animationBuilder.setOptions(options).setPlayState('running');
    return this._animationBuilder.animate(this._elementRef.nativeElement);
  }

  public hide(options: AnimationOptions): Promise<HTMLElement> {
    return this._animationBuilder
      .setOptions(options)
      .animate(this._elementRef.nativeElement)
      .then((element) => {
      element.setAttribute('hidden', '');
      return element;
    });
  }

  public show(options: AnimationOptions): Promise<HTMLElement> {
    this._elementRef.nativeElement.removeAttribute('hidden');

    return this._animationBuilder
      .setOptions(options)
      .animate(this._elementRef.nativeElement);
  }

  public animate() {
    if (!this._defaultOptions) {
      return;
    }

    this._animationBuilder.setOptions(this._defaultOptions).setPlayState('running');
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
