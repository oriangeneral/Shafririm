import { Component, Inject } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { CardComponent } from '../../card/card.component';
import { QuestionsComponent } from '../questions.component';

@Component({
  selector: 'question',
  templateUrl: './question.html',
  styleUrls: ['./question.less'],
  directives: [
    RouterLink,
    CardComponent
  ]
})
export class QuestionComponent {

  public active: boolean = false;

  constructor(@Inject(QuestionsComponent) public questionsComponent: QuestionsComponent) {
    this.questionsComponent.addQuestion(this);
  }

}
