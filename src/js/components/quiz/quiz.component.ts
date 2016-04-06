import { Component, Inject } from 'angular2/core';

import { QuestionsComponent } from '../questions/questions.component';
import { QuestionComponent } from '../questions/question/question.component';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.less'],
  directives: [
    QuestionsComponent,
    QuestionComponent
  ]
})
export class QuizComponent {

}
