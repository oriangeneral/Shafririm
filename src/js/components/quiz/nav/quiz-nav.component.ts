import { Component } from '@angular/core';

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
    MaterializeDirective
  ]
})
export class QuizNavComponent {

  constructor() {

  }

}
