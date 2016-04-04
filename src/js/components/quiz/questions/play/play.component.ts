import { Component } from 'angular2/core';

import { QuizService } from '../../../../services/quiz.service';
import { Question, HostConfig, DirectivesConfig } from '../question';

@Component({
  selector: 'question-play',
  templateUrl: './play.html',
  host: HostConfig,
  directives: DirectivesConfig
})
export class PlayComponent extends Question {

  constructor(quizService: QuizService) {
    super(quizService);
    console.log('play component');
  }

}
