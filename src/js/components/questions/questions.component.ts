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

  private _questions: QuestionComponent[] = [];
  private _activeQuestion: QuestionComponent = null;

  constructor( @Inject(QuizService) private _quizService: QuizService) { }

  public addQuestion(question: QuestionComponent) {
    if (this.questions.length === 0) {
      question.active = true;
      this._activeQuestion = question;
    }

    question.number = this.questionsCount + 1;
    this.questions.push(question);
  }

  public activateQuestion(question: QuestionComponent) {
    this.questions.forEach((qu) => {
      qu.active = false;
    });

    this._activeQuestion = question;
    question.active = true;
  }

  public activateQuestionByNumber(number: number) {
    if (number > this.questionsCount || number < 1) {
      return;
    }

    this.activateQuestion(this.questions[number - 1]);
  }

  public nextQuestion() {
    if (!this.hasNextQuestion()) {
      return;
    }

    this.activateQuestionByNumber(this.activeQuestion.number + 1);
  }

  public previousQuestion() {
    if (!this.hasPreviousQuestion()) {
      return;
    }

    this.activateQuestionByNumber(this.activeQuestion.number - 1);
  }

  public hasNextQuestion() {
    return (this.activeQuestion.number + 1 <= this.questionsCount);
  }

  public hasPreviousQuestion() {
    return (this.activeQuestion.number - 1 > 0);
  }

  public totalQuestions(): number {
    return this.questions.length;
  }

  public questionsToCreate(): number[] {
    let arr: number[] = [];
    times(this.quizService.totalQuestions, (i) => arr.push(i));
    return arr;
  }

  get activeQuestion(): QuestionComponent {
    return this._activeQuestion;
  }

  get questionsCount(): number {
    return this._questions.length;
  }

  get quizService(): QuizService {
    return this._quizService;
  }

  get questions(): QuestionComponent[] {
    return this._questions;
  }

}
