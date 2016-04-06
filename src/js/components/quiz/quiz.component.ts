import { Component, Inject, AfterViewInit, ViewChild } from 'angular2/core';

import { QuizService } from '../../services/quiz.service';
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
    QuizService
  ]
})
export class QuizComponent implements AfterViewInit {
  @ViewChild(QuestionsComponent)
  public questionsComponent: QuestionsComponent;

  constructor(@Inject(QuizService) public quizService: QuizService) { }

  public ngAfterViewInit() {
    this.quizService.questionsComponent = this.questionsComponent;
  }
}
