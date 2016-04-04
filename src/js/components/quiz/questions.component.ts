import { Component, OnInit, DynamicComponentLoader, ElementRef, ComponentRef } from 'angular2/core';

import { QuizService } from '../../services/quiz.service';
import { Question } from './questions/question';
import { PlayComponent } from './questions/play/play.component';
import { SelectComponent } from './questions/select/select.component';

// Router will be used here as well to
// use subroutes and subviews later
@Component({
  selector: 'questions',
  templateUrl: './questions.html',
  directives: [
    PlayComponent,
    SelectComponent
  ],
  providers: [
    QuizService
  ]
})
export class QuestionsComponent implements OnInit {

  public loading: boolean = true;
  public questions: Question[] = [];

  constructor(
    private dcl: DynamicComponentLoader,
    private elementRef: ElementRef,
    private _quizService: QuizService
    ) { }

  public ngOnInit() {
    this._quizService.loadQuestions()
      .then(this.buildQuestions.bind(this))
      .then((questionsCount) => console.log('questions added:', questionsCount))
      .then(this.startQuiz.bind(this))
      .then(() => this.loading = false)
      .then(() => this._quizService.activeQuestion = 1);
  }

  public logSomething() {
    console.log('logging!');
  }

  private buildQuestions(): Promise<number> {
    // Just an example how to load a component dynamically
    // A different approach will most likely be used

    return this.dcl.loadIntoLocation(SelectComponent, this.elementRef, 'questions')
      .then((compRef: ComponentRef) => {
      compRef.instance.questionNumber = 1;
      this._quizService.totalQuestions++;
      return this.dcl.loadIntoLocation(PlayComponent, this.elementRef, 'questions');
    }).then((compRef: ComponentRef) => {
      this._quizService.totalQuestions++;
      compRef.instance.questionNumber = 2;
    }).then(() => this._quizService.totalQuestions);
  }

  private startQuiz() {
    console.log('Quiz started.');
  }

}
