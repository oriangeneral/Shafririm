import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnimatesDirective } from 'css-animator';

import { QuizService } from 'app/services/quiz.service';
import { Question } from 'app/models/question';

import template from './quiz.html';
import mainStyle from './quiz.css';

@Component({
  selector: 'quiz',
  template: template,
  styles: [
    mainStyle
  ],
  providers: [
    QuizService
  ]
})
export class QuizComponent implements OnInit {

  private _questions: Question[] = [];
  private _ready: boolean = false;

  constructor(
    private _router: Router,
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
      .init(10)
      .subscribe((questions) => {
        this._questions = this.quizService.questions;
      });
  }

  public trackByQuestion(question: Question) {
    return question.id;
  }

  public onGoHome(navAnimatesDirective: AnimatesDirective) {
    navAnimatesDirective
      .hide({ type: 'fadeOutUp', delay: 400, duration: 600 })
      .then(() => {
        this._router.navigate(['/']);
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

}
