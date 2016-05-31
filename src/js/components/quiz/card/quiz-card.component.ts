import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from "angular2-materialize";

import cardTemplate from './quiz-card.html';
import cardStyle from './quiz-card.css';

@Component({
  selector: 'quiz-card',
  template: cardTemplate,
  styles: [cardStyle],
  directives: [
    AnimatesDirective,
    MaterializeDirective,
    ROUTER_DIRECTIVES
  ]
})
export class QuizCardComponent {

  constructor(private _router: Router) {

  }

  public goHome(animation: AnimatesDirective) {

  }

}
