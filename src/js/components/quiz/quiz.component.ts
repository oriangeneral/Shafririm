import { Component, Inject, AfterViewInit, ViewChild } from 'angular2/core';

import { QuizService } from '../../services/quiz.service';
import { AnimatesDirective } from '../../directives/animates.directive';
import { QuestionsComponent } from '../questions/questions.component';
import { QuestionComponent } from '../questions/question/question.component';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.less'],
  directives: [
    QuestionsComponent,
    QuestionComponent
  ],
  providers: [
    QuizService,
    AnimatesDirective
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
