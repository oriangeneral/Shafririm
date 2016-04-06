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

  private _active: boolean = false;
  private _number: number = 0;

  constructor( @Inject(QuestionsComponent) private _questionsComponent: QuestionsComponent) {
    this.questionsComponent.addQuestion(this);
  }

  get questionsComponent(): QuestionsComponent {
    return this._questionsComponent;
  }

  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    this._active = active;
  }

  get number(): number {
    return this._number;
  }

  set number(number: number) {
    this._number = number;
  }

}
