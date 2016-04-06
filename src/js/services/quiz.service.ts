import { Injectable, Inject } from 'angular2/core';

import { QuestionsComponent } from '../components/questions/questions.component';

@Injectable()
export class QuizService {

  public questionsComponent: QuestionsComponent;

  get totalQuestions(): number {
    return 10;
  }

}
