import { Component } from 'angular2/core';

import { QuizService } from '../../../../services/quiz.service';
import { Question, HostConfig } from '../question';

@Component({
  selector: 'question-select',
  templateUrl: './select.html',
  host: HostConfig
})
export class SelectComponent extends Question {

  constructor(quizService: QuizService) {
    super(quizService);
    console.log('select component');
  }

}
