import { Component, Inject } from 'angular2/core';

import { CardComponent } from '../../../card/card.component';
import { QuestionsComponent } from '../questions.component';

@Component({
  selector: 'question',
  templateUrl: './question.html',
  styleUrls: ['./question.less'],
  directives: [
    CardComponent
  ]
})
export class QuestionComponent {

  constructor(@Inject(QuestionsComponent) questionsComponent: QuestionsComponent) {
    console.log(questionsComponent);
    // this.questionsComponent.addQuestion(this);
  }

}
