import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnimatesDirective } from 'css-animator';

import { Unsubscriber } from 'app/components';
import { QuizService } from 'app/services';
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
export class QuizComponent extends Unsubscriber implements OnInit {

  private _questions: Question[] = [];
  private _ready: boolean = false;

  constructor(
    private _router: Router,
    private _quizService: QuizService
  ) {
    super();

    let onReady = this.quizService
      .onReady
      .subscribe(() => {
        this._ready = true;
        this.quizService.activateQuestion(1);
      });

    let onRefresh = this.quizService
      .onRefresh
      .subscribe(() => {
        this._questions = this.quizService.questions;
        this._ready = true;
      });

    this.subscriptions.push(onReady);
    this.subscriptions.push(onRefresh);
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
    setTimeout(() => {
      this._router.navigate(['/']);
    }, 1000);

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

export default QuizComponent;
