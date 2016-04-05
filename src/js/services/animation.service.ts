import { Injectable, ElementRef } from 'angular2/core';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { CssAnimationBuilder } from 'angular2/src/animate/css_animation_builder';

@Injectable()
export class AnimationService {

  constructor(private _ab: AnimationBuilder) { }

  public builder(): CssAnimationBuilder {
    return this._ab.css();
  }

}
