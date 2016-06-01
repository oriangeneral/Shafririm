import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from "angular2-materialize";

import { QuizService } from 'app/services/quiz.service';

import { QuizNavComponent } from './nav/quiz-nav.component';
import { QuizCardComponent } from './card/quiz-card.component';
import { QuizStatusComponent } from './status/quiz-status.component';

import { Question } from 'app/models/question';

import quizTemplate from './quiz.html';
import quizStyle from './quiz.css';

@Component({
  selector: 'quiz',
  template: quizTemplate,
  styles: [quizStyle],
  directives: [
    QuizNavComponent,
    QuizCardComponent,
    QuizStatusComponent,
    AnimatesDirective,
    MaterializeDirective,
    ROUTER_DIRECTIVES
  ],
  providers: [
    QuizService
  ]
})
export class QuizComponent implements OnInit {

  private _questions: Question[] = [];

  constructor(
    private router: Router,
    private quizService: QuizService
  ) {
    this.quizService
      .onReady.subscribe(() => {
        this.quizService.activateQuestion(1);
      });
  }

  public ngOnInit() {
    console.log('getting questions...');
    this.quizService
      .init(10)
      .subscribe((questions) => {
        this._questions = questions;
      }, (error) => handleError(error));
  }

  public onGoHome() {

  }

  public onReload() {

  }

  public onClose() {

  }

  get questions() {
    return this._questions;
  }

  private handleError() {

  }

}
