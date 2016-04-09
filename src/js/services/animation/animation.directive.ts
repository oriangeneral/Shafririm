import { Directive, ElementRef, Input, Inject, OnInit, OnDestroy } from 'angular2/core';

import { AnimationService, AnimationBuilder, AnimationOptions } from '../animation';

@Directive({
  selector: '[animates]',
  exportAs: 'animation'
})
export class AnimationDirective implements OnInit {
  @Input('animates') private _defaultOptions: AnimationOptions;
  @Input('animatesOnInit') private _initOptions: AnimationOptions;
  @Input('animatesOnDestroy') private _destroyOptions: AnimationOptions;


  private _animationBuilder: AnimationBuilder;

  get animationBuilder(): AnimationBuilder {
    return this._animationBuilder;
  }

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
      .hide(this._elementRef.nativeElement)
      .then((element) => element, (error) => {
        // Animation interrupted
      });
  }

  public show(options: AnimationOptions): Promise<HTMLElement> {
    return this._animationBuilder
      .setOptions(options)
      .show(this._elementRef.nativeElement)
      .then((element) => element, (error) => {
        // Animation interrupted
      });
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
