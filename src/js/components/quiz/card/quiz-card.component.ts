import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';

import { AnimationService, AnimationBuilder, AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from 'angular2-materialize';

import { QuizService } from 'app/services/quiz.service';

import { Question } from 'app/models/question';

import cardTemplate from './quiz-card.html';
import cardStyle from './quiz-card.css';

@Component({
  selector: 'quiz-card',
  template: cardTemplate,
  styles: [cardStyle],
  directives: [
    AnimatesDirective,
    MaterializeDirective
  ]
})
export class QuizCardComponent implements OnInit {
  @Input() public question: Question;

  private _animator: AnimationBuilder;
  private _active: boolean = false;

  private nextTimeout: any = null;

  constructor(private _elementRef: ElementRef, private _quizService: QuizService, animationService: AnimationService) {
    this._animator = animationService.builder().setDuration(600);

    this._quizService
      .onActivateQuestion.subscribe((questionNumber) => {
        if (questionNumber === this.question.id) {
          this._active = true;
          this._animator.setType('fadeInRight').setDelay(200);

          if (questionNumber === 1) {
            this._animator.setType('fadeInUp');
          }

          this._animator.show(this._elementRef.nativeElement);
        } else if (this.active) {
          this._animator.setType('fadeOutLeft').setDelay(0);
          this._animator.hide(this._elementRef.nativeElement);

          this._active = false;
        }
      });
  }

  get active() {
    return this._active;
  }

  public nextQuestion() {
    if (this._nextTimeout !== null) {
      clearTimeout(this._nextTimeout);
    }

    this._nextTimeout = setTimeout(() => {
      this._quizService.activateQuestion(this.question.id + 1);
      this._nextTimeout = null;
    }, 400);
  }

  public ngOnInit() {
    if (this.question.id === this._quizService.totalQuestions) {
      setTimeout(() => {
        this._quizService.ready();
      }, 600);
    }
  }

}
