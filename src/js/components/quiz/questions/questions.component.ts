import { Component, Inject, Host } from 'angular2/core';

import { QuizComponent } from '../quiz.component';
// import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'questions',
  templateUrl: './questions.html',
  styleUrls: ['./questions.less'],
  directives: [
    // QuestionComponent
  ]
})
export class QuestionsComponent {

  // public questions: QuestionComponent[] = [];

  constructor(/*@Inject(QuizComponent) quizComponent: QuizComponent*/) {
    // console.log(quizComponent);
    // empty
  }

  // public addQuestion(question: QuestionComponent) {
  //   this.questions.push(question);
  // }

}
