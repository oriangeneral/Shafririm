import { Component, Inject, AfterViewInit, ViewChild } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { QuizService } from '../../services/quiz.service';
import { AnimationDirective } from '../../services/animation';
import { QuestionsComponent } from '../questions/questions.component';
import { QuestionComponent } from '../questions/question/question.component';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.less'],
  directives: [
    RouterLink,
    QuestionsComponent,
    QuestionComponent,
    AnimationDirective
  ],
  providers: [
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
