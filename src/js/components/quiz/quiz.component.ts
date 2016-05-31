import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from "angular2-materialize";

import { QuizService } from 'app/services/quiz.service';

import { QuizNavComponent } from './nav/quiz-nav.component';
import { QuizCardComponent } from './card/quiz-card.component';

import quizTemplate from './quiz.html';
import quizStyle from './quiz.css';

@Component({
  selector: 'quiz',
  template: quizTemplate,
  styles: [quizStyle],
  directives: [
    QuizNavComponent,
    QuizCardComponent,
    AnimatesDirective,
    MaterializeDirective,
    ROUTER_DIRECTIVES
  ],
  providers: [
    QuizService
  ]
})
export class QuizComponent {

  public questions: number[] = [
    1, 2, 3, 4, 5, 6
  ];

  constructor(private _router: Router) {

  }

  public goHome(animation: AnimatesDirective) {
    animation
      .hide({
        type: 'fadeOutUp',
        duration: 600
      }).then(() => this._router.navigate(['/']));
  }

}
