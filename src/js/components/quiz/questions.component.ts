import { Component, OnInit, ElementRef } from 'angular2/core';

import * as Questions from './questions/questions';
const QUESTION_DIRECTIVES = Object.keys(Questions).map(key => Questions[key]);

import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.html',
  styleUrls: ['./questions.less'],
  directives: [
    QUESTION_DIRECTIVES
  ]
})
export class QuestionsComponent implements OnInit {

  public loading: boolean = true;

  constructor(
    private _elementRef: ElementRef,
    private _quizService: QuizService
    ) { }

  public ngOnInit() {
    this._quizService.init(this._elementRef)
      .then(() => this.loading = false);
  }

}
