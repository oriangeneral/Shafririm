import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';

import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnimationService, AnimationBuilder } from 'css-animator';
import { Unsubscriber } from 'app/components';
import { QuizService } from 'app/services';
import { Answer } from 'app/models/question';

import template from './quiz-card.html';
import mainStyle from './quiz-card.css';

@Component({
  selector: 'quiz-card',
  template: template,
  styles: [
    mainStyle
  ]
})
export class QuizCardComponent extends Unsubscriber implements OnInit {
  @Input() public question: any; // Should be of type Question
  @Output() public showNextButton = new EventEmitter();
  @Output() public hideNextButton = new EventEmitter();

  private _animator: AnimationBuilder;
  private _player: HTMLAudioElement;

  private _active: boolean = false;
  private _markedAnswer: number = -1;
  private _countdown = 10;
  private _nextTimeout: any = null;

  constructor(private _elementRef: ElementRef, private _quizService: QuizService, animationService: AnimationService) {
    super();
    this._animator = animationService.builder().setDuration(600);
    this.subscribeToActivate();
    this.subscribeToClose();
  }

  public ngOnInit() {
    if (this.question.id === this._quizService.totalQuestions) {
      setTimeout(() => {
        this._quizService.ready();
      }, 100);
    }
  }

  public answerIsCorrect() {
    let count = 0;
    for (let answer of this.question.answers) {
      if (answer.correct && this._markedAnswer === count) {
        return true;
      }

      count++;
    }

    return false;
  }

  public playSong(player: HTMLAudioElement, button: HTMLElement) {
    this._player = player;
    let countdown = this._countdown - 1;

    Observable
      .interval(1000)
      .timeInterval()
      .take(this._countdown)
      .subscribe((next) => {
        this._countdown = countdown - next.value;
      }, (error) => {

      }, () => {
        this._countdown = 0;
        player.pause();
      });

    player.play();
    button.setAttribute('disabled', '');
    button.classList.add('disabled');
  }

  public answerClicked(index, checked) {
    if (!checked) {
      this._markedAnswer = -1;
      this.hideNextButton.next();
      return;
    }

    this.showNextButton.next();
    this._markedAnswer = index;
  }

  public nextQuestion(button: HTMLElement) {
    if (this._nextTimeout !== null) {
      clearTimeout(this._nextTimeout);
    }

    if (!this.hasMarkedAnswer) {
      return;
    }

    if (this.answerIsCorrect()) {
      button.classList.add('green');
    } else {
      button.classList.add('red');
    }

    this._nextTimeout = setTimeout(() => {
      this._quizService.activateQuestion(this.question.id + 1);
      this._nextTimeout = null;
    }, 400);
  }

  get hasMarkedAnswer() {
    return this._markedAnswer > -1;
  }

  get markedAnswer() {
    return this._markedAnswer;
  }

  get active() {
    return this._active;
  }

  get countdown() {
    return this._countdown;
  }

  get quizService() {
    return this._quizService;
  }

  private subscribeToActivate() {
    let subscription = this._quizService
      .onActivateQuestion.subscribe((questionNumber) => {
        if (questionNumber === this.question.id) {
          this.activateQuestion();
        } else if (this.active) {
          this.deactivateQuestion();
        }
      });

    this.subscriptions.push(subscription);
  }

  private subscribeToClose() {
    let subscription = this._quizService
      .onClose
      .subscribe((questionNumber) => {
        if (this._active) {
          this._animator
            .setType('fadeOutDown')
            .setDuration(600)
            .hide(this._elementRef.nativeElement);
        }
      });

    this.subscriptions.push(subscription);
  }

  private subscribeToRefresh() {
    // let subscription = this._quizService
    //   .onRefresh
    //   .subscribe(() => {
    //     this._active = false;
    //
    //     if (this._nextTimeout !== null) {
    //       clearTimeout(this._nextTimeout);
    //       this._nextTimeout = null;
    //     }
    //
    //     this._markedAnswer = -1;
    //     this._countdown = 10;
    //
    //     this.question.answered = false;
    //     this.question.status.answered = false;
    //     this.question.status.selectedAnswer = null;
    //     this.question.status.wasCorrect = null;
    //
    //     if (this._player) {
    //       this._player.pause();
    //     }
    //
    //     this.hideNextButton.next();
    //
    //     if (this.question.id === this._quizService.totalQuestions) {
    //       setTimeout(() => {
    //         this._quizService.onReady.emit();
    //       });
    //     }
    //   });
    //
    // this.subscriptions.push(subscription);
  }

  private activateQuestion() {
    this._active = true;
    this._animator.setType('fadeInRight').setDelay(200);

    if (this.question.id === 1) {
      this._animator.setType('fadeInUp');
    }

    this._animator.show(this._elementRef.nativeElement);
  }

  private deactivateQuestion() {
    this._animator.setType('fadeOutLeft').setDelay(0).setDuration(600);

    this.question.answered = true;
    this.question.status.answered = true;
    this.question.status.selectedAnswer = this._markedAnswer;
    this.question.status.wasCorrect = this.answerIsCorrect();

    if (this._player) {
      this._player.pause();
    }

    if (this.question.id === this._quizService.totalQuestions) {
      this._animator.setType('fadeOutDown');
      this._quizService.completed();
    }

    this._animator.hide(this._elementRef.nativeElement);
    this._active = false;
  }

}

export default QuizCardComponent;
