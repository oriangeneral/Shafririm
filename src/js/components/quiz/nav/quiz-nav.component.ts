import { Component, Output, EventEmitter } from '@angular/core';

import { QuizService } from 'app/services';

import template from './quiz-nav.html';
import mainStyle from './quiz-nav.css';

@Component({
  selector: 'quiz-nav',
  template: template,
  styles: [
    mainStyle
  ]
})
export class QuizNavComponent {
  @Output() public onGoHome = new EventEmitter<any>();
  @Output() public onRefresh = new EventEmitter<any>();
  @Output() public onClose = new EventEmitter<any>();

  constructor(private _quizService: QuizService) {

  }

  public get progress() {
    return this._quizService.progress();
  }

  public goHome() {
    this.onGoHome.next();
  }

  public refresh() {
    this.onRefresh.next();
  }

  public close() {
    this.onClose.next();
  }

}

export default QuizNavComponent;
