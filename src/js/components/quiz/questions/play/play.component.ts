import { Component } from 'angular2/core';

import { QuizService } from '../../../../services/quiz.service';
import { Question, QUESTION_HOST } from '../question';

@Component({
  selector: 'question-play',
  templateUrl: './play.html',
  host: QUESTION_HOST
})
export class PlayComponent extends Question {

  constructor(quizService: QuizService) {
    super(quizService);
  }

}
