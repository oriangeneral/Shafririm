import { Component } from 'angular2/core';

import { QuizService } from '../../../../services/quiz.service';
import { Question, QUESTION_HOST } from '../question';

import { CardComponent } from '../../../card/card.component';

@Component({
  selector: 'question-select',
  templateUrl: './select.html',
  styleUrls: ['./select.less'],
  host: QUESTION_HOST,
  directives: [
    CardComponent
  ]
})
export class SelectComponent extends Question {

  constructor(quizService: QuizService) {
    super(quizService);
  }

}
