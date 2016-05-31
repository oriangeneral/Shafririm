import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from "angular2-materialize";

import navTemplate from './quiz-nav.html';
import navStyle from './quiz-nav.css';

@Component({
  selector: 'quiz-nav',
  template: navTemplate,
  styles: [navStyle],
  directives: [
    AnimatesDirective,
    MaterializeDirective,
    ROUTER_DIRECTIVES
  ]
})
export class QuizNavComponent {

  constructor(private _router: Router) {

  }

  public goHome(animation: AnimatesDirective) {

  }

}
