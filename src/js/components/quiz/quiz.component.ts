import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from "angular2-materialize";

import quizTemplate from './quiz.html';
import quizStyle from './quiz.css';

@Component({
  selector: 'quiz',
  template: quizTemplate,
  styles: [ quizStyle ],
  directives: [
    AnimatesDirective,
    MaterializeDirective,
    ROUTER_DIRECTIVES
  ]
})
export class QuizComponent {

}
