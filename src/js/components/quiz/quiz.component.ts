import { Component } from 'angular2/core';
import { RouteConfig, RouterOutlet } from 'angular2/router';

import { QuestionsComponent } from './questions.component';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.html',
  directives: [
    RouterOutlet
  ]
})
@RouteConfig([
  {
    path: '/',
    name: 'Questions',
    component: QuestionsComponent,
    useAsDefault: true
  }
])
export class QuizComponent { }
