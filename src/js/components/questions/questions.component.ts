import { Component } from 'angular2/core';

import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'questions',
  templateUrl: './questions.html',
  styleUrls: ['./questions.less']
})
export class QuestionsComponent {

  public questions: QuestionComponent[] = [];

  public addQuestion(question: QuestionComponent) {
    if (this.questions.length === 0) {
      question.active = true;
    }

    this.questions.push(question);
  }

  public activateQuestion(question: QuestionComponent) {
    this.questions.forEach((qu) => {
      qu.active = false;
    });

    question.active = true;
  }

}
