import { Component } from '@angular/core';

import { AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from 'angular2-materialize';

import { QuizService } from 'app/services/quiz.service';

import doneTemplate from './quiz-done.html';
import doneStyle from './quiz-done.css';

@Component({
  selector: 'quiz-done',
  template: doneTemplate,
  styles: [doneStyle],
  directives: [
    AnimatesDirective,
    MaterializeDirective
  ]
})
export class QuizDoneComponent {

  constructor(private _quizService: QuizService) {

  }

}
