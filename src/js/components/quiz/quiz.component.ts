import { Component, Inject, AfterViewInit, ViewChild } from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { PlaylistService } from '../../services/playlist.service';
import { QuizService } from '../../services/quiz.service';
import { QuestionsComponent } from '../questions/questions.component';
import { QuestionComponent } from '../questions/question/question.component';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.less'],
  directives: [
    RouterLink,
    QuestionsComponent,
    QuestionComponent
  ],
  providers: [
    HTTP_PROVIDERS,
    PlaylistService,
    QuizService
  ]
})
export class QuizComponent implements AfterViewInit {

  @ViewChild(QuestionsComponent)
  private _questionsComponent: QuestionsComponent;

  constructor( @Inject(QuizService) private _quizService: QuizService) { }

  public ngAfterViewInit() {
    this.quizService.questionsComponent = this.questionsComponent;
  }

  get quizService(): QuizService {
    return this._quizService;
  }

  get questionsComponent(): QuestionsComponent {
    return this._questionsComponent;
  }

}
