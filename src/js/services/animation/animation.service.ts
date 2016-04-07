import { Injectable, ElementRef } from 'angular2/core';
import { AnimationBuilder } from './animation_builder';

@Injectable()
export class AnimationService {

  public builder(): AnimationBuilder {
    return new AnimationBuilder();
  }

}
