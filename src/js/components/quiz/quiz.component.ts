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
  private _ready: boolean = false;

  constructor(
    private router: Router,
    private quizService: QuizService
  ) {
    this.quizService
      .onReady.subscribe(() => {
        this.quizService.activateQuestion(1);
        this._ready = true;
      });

    this.quizService
      .onRefresh.subscribe(() => {
        console.log('refresh event');
        this._questions = this.quizService.questions;
      });
  }

  public ngOnInit() {
    console.log('getting questions...');
    this.quizService
      .init(10)
      .subscribe((questions) => {
        this._questions = this.quizService.questions;
      }, (error) => handleError(error));
  }

  public onGoHome(navAnimatesDirective: AnimatesDirective) {
    navAnimatesDirective
      .hide({ type: 'fadeOutUp', delay: 400, duration: 600 })
      .then(() => {
        this.router.navigate(['/']);
      });

    this.quizService.close();
  }

  public onRefresh(navAnimatesDirective: AnimatesDirective) {
    console.log('onrefresh');
    this.quizService.close();
    setTimeout(() => {
      this._questions = [];
      this._ready = false;
      setTimeout(() => {
        this.quizService.refresh();
      });
    }, 600);
  }

  public onClose(navAnimatesDirective: AnimatesDirective) {
    this.onGoHome(navAnimatesDirective);
  }

  get questions() {
    return this._questions;
  }

  get ready() {
    return this._ready;
  }

  private handleError() {

  }

}
