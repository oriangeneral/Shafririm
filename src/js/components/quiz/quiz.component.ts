import { Component, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { PlaylistService } from '../../services/playlist.service';
import { QuizService } from '../../services/quiz.service';
import { QuestionsComponent } from '../questions/questions.component';
import { QuestionComponent } from '../questions/question/question.component';

import quizTemplate from './quiz.html';
import quizStyle from './quiz.less';

@Component({
  selector: 'quiz',
  template: quizTemplate,
  styles: [ quizStyle ],
  directives: [
    ROUTER_DIRECTIVES,
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
