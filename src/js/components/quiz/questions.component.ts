import { Component, OnInit, DynamicComponentLoader, Injector } from 'angular2/core';

import { QuizService } from '../../services/quiz.service';

import { SelectComponent } from './questions/select.component';

// Router will be used here as well to
// use subroutes and subviews later
@Component({
  selector: 'questions',
  templateUrl: './questions.html',
  providers: [
    QuizService
  ]
})
export class QuestionsComponent implements OnInit {

  constructor(
    private dcl: DynamicComponentLoader,
    private injector: Injector,
    private _quizService: QuizService
  ) { }

  public ngOnInit() {
    this._quizService.loadQuestions()
      .then(this.nextQuestion.bind(this));
  }

  private nextQuestion() {
    // Just an example how to load a component dynamically
    // A different approach will most likely be used
    this.dcl.loadAsRoot(SelectComponent, 'question', this.injector);
  }

}
