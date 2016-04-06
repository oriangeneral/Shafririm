import { Component, Inject } from 'angular2/core';

import { QuizService } from '../../services/quiz.service';
import { QuestionComponent } from './question/question.component';

import { times } from '../../helpers/common';

@Component({
  selector: 'questions',
  templateUrl: './questions.html',
  styleUrls: ['./questions.less']
})
export class QuestionsComponent {

  public _questions: QuestionComponent[] = [];
  private _questionsCount = 0;
  private _activeQuestion = 0;

  constructor( @Inject(QuizService) public quizService: QuizService) { }

  public addQuestion(question: QuestionComponent) {
    this._questionsCount++;

    if (this._questions.length === 0) {
      question.active = true;
      this._activeQuestion = this._questionsCount;
    }

    question.number = this._questionsCount;
    this._questions.push(question);
  }

  public activateQuestion(question: QuestionComponent) {
    this._questions.forEach((qu) => {
      qu.active = false;
    });

    this._activeQuestion = question.number;
    question.active = true;
  }

  public activateQuestionByNumber(number: number) {
    if (number > this._questionsCount || number < 1) {
      return;
    }

    this.activateQuestion(this._questions[number - 1]);
  }

  public nextQuestion() {
    if (!this.hasNextQuestion()) {
      return;
    }

    this.activateQuestionByNumber(this._activeQuestion + 1);
  }

  public previousQuestion() {
    if (!this.hasPreviousQuestion()) {
      return;
    }

    this.activateQuestionByNumber(this._activeQuestion - 1);
  }

  public hasNextQuestion() {
    return (this._activeQuestion + 1 <= this._questionsCount);
  }

  public hasPreviousQuestion() {
    return (this._activeQuestion - 1 > 0);
  }

  get totalQuestions(): number {
    return this._questionsCount = this._questions.length;
  }

  get activeQuestion(): QuestionComponent {
    return this._questions[this._activeQuestion - 1];
  }

  get questionsToCreate(): number[] {
    let arr: number[] = [];
    times(this.quizService.totalQuestions, (i) => arr.push(i));
    return arr;
  }

}
