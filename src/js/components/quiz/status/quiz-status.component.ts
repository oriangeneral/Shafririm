import { Component } from '@angular/core';

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

  constructor(private _quizService: QuizService) {

  }

  get quizService() {
    return this._quizService;
  }

}
