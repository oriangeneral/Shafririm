import { Component, Inject } from 'angular2/core';

import { QuizComponent } from './quiz.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionComponent } from './questions/question/question.component';

@Component({
  selector: 'test',
  templateUrl: './test.html',
  styleUrls: [],
  directives: [
    QuizComponent,
    QuestionsComponent,
    QuestionComponent
  ]
})
export class TestComponent {

  constructor() {
    console.log('construct test');
  }

}
