import { NgIf } from 'angular2/common';

import { QuizService } from '../../../services/quiz.service';

export class Question {

  private _questionNumber: number = 0;

  public constructor(public quizService: QuizService) {
    console.log('question super constructor');
  }

  public logSomething() {
    console.log('testing');
  }

  get questionNumber(): number {
    return this._questionNumber;
  }

  set questionNumber(questionNumber) {
    this._questionNumber = questionNumber;
  }

}

export let HostConfig: { [key: string]: string; } = {
  'class': 'question',
  // '*ngIf': 'quizService.activeQuestion === questionNumber', // not working (yet?)
  '[hidden]': 'quizService.activeQuestion !== questionNumber'
};

export let DirectivesConfig = [
  NgIf
];
