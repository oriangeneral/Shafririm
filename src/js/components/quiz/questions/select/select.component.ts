import { Component } from 'angular2/core';

import { QuizService } from '../../../../services/quiz.service';
import { Question, QUESTION_HOST } from '../question';

@Component({
  selector: 'question-select',
  templateUrl: './select.html',
  host: QUESTION_HOST
})
export class SelectComponent extends Question {

  constructor(quizService: QuizService) {
    super(quizService);
  }

}
