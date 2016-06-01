import { Component } from '@angular/core';

import { AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from 'angular2-materialize';

import { QuizService } from 'app/services/quiz.service';

import statusTemplate from './quiz-status.html';
import statusStyle from './quiz-status.css';

@Component({
  selector: 'quiz-status',
  template: statusTemplate,
  styles: [statusStyle],
  directives: [
    AnimatesDirective,
    MaterializeDirective
  ]
})
export class QuizStatusComponent {

  constructor(private _quizService: QuizService) {

  }

  get quizService() {
    return this._quizService;
  }

}
