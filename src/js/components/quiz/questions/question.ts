import { QuizService } from '../../../services/quiz.service';

export class Question {

  private _questionNumber: number = 0;

  public constructor(public quizService: QuizService) { }

  get questionNumber(): number {
    return this._questionNumber;
  }

  set questionNumber(questionNumber) {
    this._questionNumber = questionNumber;
  }

}

export const QUESTION_HOST: { [key: string]: string; } = {
  'class': 'question',
  // '*ngIf': 'quizService.activeQuestion === questionNumber', // not working (yet?)
  '[hidden]': 'quizService.activeQuestion !== questionNumber'
};
