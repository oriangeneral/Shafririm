import { Component, Inject } from 'angular2/core';
import { RouteConfig, RouterOutlet } from 'angular2/router';

import { QuestionsComponent } from './questions/questions.component';
import { QuestionComponent } from './questions/question/question.component';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.less'],
  directives: [
    RouterOutlet,
    QuestionsComponent
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
export class QuizComponent {

}
