import { Component, Output, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { QuizService } from 'app/services/quiz.service';

import template from './quiz-status.html';
import mainStyle from './quiz-status.css';

@Component({
  selector: 'quiz-status',
  template: template,
  styles: [
    mainStyle
  ]
})
export class QuizStatusComponent {

  @Output() public modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private _quizService: QuizService) {

  }

  public openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  public closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

  get quizService() {
    return this._quizService;
  }

}
