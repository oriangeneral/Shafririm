import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from "angular2-materialize";

import { QuizService } from 'app/services/quiz.service';

import { QuizNavComponent } from './nav/quiz-nav.component';
import { QuizCardComponent } from './card/quiz-card.component';
import { QuizDoneComponent } from './done/quiz-done.component';
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
    QuizDoneComponent,
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
    private _quizService: QuizService
  ) {
    this.quizService
      .onReady.subscribe(() => {
        this._ready = true;
        this.quizService.activateQuestion(1);
      });

    this.quizService
      .onRefresh.subscribe(() => {
        this._questions = this.quizService.questions;
      });
  }

  public ngOnInit() {
    this.quizService
      .init(2)
      .subscribe((questions) => {
        this._questions = this.quizService.questions;
      }, (error) => this.handleError(error));
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
    this.quizService.close();
    setTimeout(() => {
      this._ready = false;
      setTimeout(() => {
        this.quizService.refresh();
      });
    }, 700);
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

  get quizService() {
    return this._quizService;
  }

  private handleError() {

  }

}
