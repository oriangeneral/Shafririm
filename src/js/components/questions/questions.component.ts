import { Component, Inject } from 'angular2/core';

import { AnimationOptions } from '../../services/animation';
import { QuizService } from '../../services/quiz.service';
import { QuestionComponent } from './question/question.component';
import { times } from '../../helpers/common';

@Component({
  selector: 'questions',
  templateUrl: './questions.html',
  styleUrls: ['./questions.less'],
  directives: []
})
export class QuestionsComponent {

  private _questions: QuestionComponent[] = [];
  private _activeQuestion: QuestionComponent = null;

  constructor( @Inject(QuizService) private _quizService: QuizService) { }

  public addQuestion(question: QuestionComponent) {
    if (this.questions.length === 0) {
      question.active = true;
      question.hidden = false;
      this._activeQuestion = question;
    }

    question.number = this.questionsCount + 1;
    this.questions.push(question);
  }

  public activateQuestion(question: QuestionComponent) {
    if (question === this._activeQuestion) {
      return;
    }

    let hideAnimationOptions: AnimationOptions;
    let showAnimationOptions: AnimationOptions;
    if (question.number > this._activeQuestion.number) {
      hideAnimationOptions = { type: 'fadeOutLeft' };
      showAnimationOptions = { type: 'fadeInRight' };
    } else {
      hideAnimationOptions = { type: 'fadeOutRight' };
      showAnimationOptions = { type: 'fadeInLeft' };
    }

    this._activeQuestion.active = false;

    if (this._activeQuestion) {
      this._activeQuestion
        .hide(hideAnimationOptions)
        .then((element) => {
        return element;
      }, (error) => {
          // Aborted
        });
    }



    // Force angular to pick up changes
    setTimeout(() => {
      this._activeQuestion = question;
      question.active = true;

      question.show(showAnimationOptions)
        .then((element) => {
        return element;
      }, (error) => {
          // Aborted
        });
    });
  }

  public activateQuestionByNumber(number: number) {
    if (number > this.questionsCount || number < 1) {
      return;
    }

    this.activateQuestion(this.getQuestion(number));
  }

  public getQuestion(number: number): QuestionComponent {
    if (number > this.questionsCount || number < 1) {
      return null;
    }

    return this.questions[number - 1];
  }

  public nextQuestion() {
    if (!this.hasNextQuestion()) {
      return;
    }

    // this._ab1
    //   .setType('fadeOutLeft')
    //   .setDuration(1000)
    //   .hide(this.getQuestion(this.activeQuestion.number).elementRef.nativeElement);
    //
    // // this.getQuestion(this.activeQuestion.number).active = true;
    // this.activateQuestionByNumber(this.activeQuestion.number + 1);
    //
    // setTimeout(() => {
    //   this._ab2
    //     .setType('fadeInRight')
    //     .setDuration(1000)
    //     .show(this.getQuestion(this.activeQuestion.number).elementRef.nativeElement);
    // });


    // console.log('next');
    // this._animationBuilder
    //   .setElement(this.getQuestion(this.activeQuestion.number).elementRef.nativeElement)
    //   .applyStyle('display', 'inline-block')
    //   .applyStyle('width', '100%')
    //   .applyStyle('position', 'relative')
    //   .setType('fadeOutLeft')
    //   .animate()
    //   .then(() => this.activateQuestionByNumber(this.activeQuestion.number + 1));

    this.activateQuestionByNumber(this.activeQuestion.number + 1);
  }

  public previousQuestion() {
    if (!this.hasPreviousQuestion()) {
      return;
    }

    // this._ab3
    //   .setType('fadeOutRight')
    //   .setDuration(1000)
    //   .hide(this.getQuestion(this.activeQuestion.number).elementRef.nativeElement);
    //
    // // this.getQuestion(this.activeQuestion.number).active = true;
    // this.activateQuestionByNumber(this.activeQuestion.number - 1);
    //
    // setTimeout(() => {
    //   this._ab4
    //     .setType('fadeInLeft')
    //     .setDuration(1000)
    //     .show(this.getQuestion(this.activeQuestion.number).elementRef.nativeElement);
    // });

    // this._previousAnimationBuilder
    //   .setType('fadeOutRight')
    //   .setDuration(1000)
    //   .hide(this.getQuestion(this.activeQuestion.number).elementRef.nativeElement);
    //
    // setTimeout(() => {
    //   this._nextAnimationBuilder
    //     .setType('fadeInLeft')
    //     .setDuration(1000)
    //     .show(this.getQuestion(this.activeQuestion.number - 1).elementRef.nativeElement);
    // }, 0);

    // this._animationBuilder.setType('fadeInRight').animate();

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
