import { Injectable } from 'angular2/core';

import { QuestionsComponent } from '../components/questions/questions.component';

@Injectable()
export class QuizService {

  private _questionsComponent: QuestionsComponent;

  get totalQuestions(): number {
    return 10;
  }

  get questionsComponent(): QuestionsComponent {
    return this._questionsComponent;
  }

  set questionsComponent(questionsComponent: QuestionsComponent) {
    this._questionsComponent = questionsComponent;
  }

}
