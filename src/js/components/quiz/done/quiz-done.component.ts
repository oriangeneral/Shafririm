import { Component, ElementRef } from '@angular/core';

import { AnimatesDirective, AnimationService, AnimationBuilder } from 'css-animator';
import { MaterializeDirective } from 'angular2-materialize';

import { QuizService } from 'app/services/quiz.service';

import doneTemplate from './quiz-done.html';
import doneStyle from './quiz-done.css';

@Component({
  selector: 'quiz-done',
  template: doneTemplate,
  styles: [doneStyle],
  host: {
    'hidden': true
  },
  directives: [
    AnimatesDirective,
    MaterializeDirective
  ]
})
export class QuizDoneComponent {

  private _animator: AnimationBuilder;
  private _hidden: boolean = true;

  constructor(
    private _quizService: QuizService,
    private _elementRef: ElementRef,
    animationService: AnimationService) {
    this._animator = animationService.builder();
    this.subscribe();
  }

  public show() {
    if (!this._hidden) {
      return;
    }

    this._hidden = false;

    this._animator
      .setType('fadeInUp')
      .setDelay(300)
      .setDuration(600)
      .show(this._elementRef.nativeElement);
  }

  public hide() {
    if (this._hidden) {
      return;
    }

    this._hidden = true;

    this._animator.setType('fadeOutDown')
      .setDelay(100)
      .setDuration(600)
      .hide(this._elementRef.nativeElement);
  }

  private subscribe() {
    this._quizService
      .onCompleted.subscribe(() => {
        this.show();
      });

    this._quizService
      .onRefresh.subscribe(() => {
        this.hide();
      });

    this._quizService
      .onClose.subscribe(() => {
        this.hide();
      });
  }

}
