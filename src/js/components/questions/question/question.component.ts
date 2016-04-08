import { Component, Inject, ElementRef, ViewChild } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { AnimationDirective, AnimationOptions } from '../../../services/animation';
import { CardComponent } from '../../card/card.component';
import { QuestionsComponent } from '../questions.component';

@Component({
  selector: 'question',
  templateUrl: './question.html',
  styleUrls: ['./question.less'],
  directives: [
    RouterLink,
    CardComponent,
    AnimationDirective
  ]
})
export class QuestionComponent {
  @ViewChild(CardComponent)
  private _cardComponent: CardComponent;

  private _active: boolean = false;
  private _wasActive: boolean = false;
  private _hidden: boolean = true;
  private _number: number = 0;

  constructor(
    @Inject(ElementRef) private _elementRef: ElementRef,
    @Inject(QuestionsComponent) private _questionsComponent: QuestionsComponent
    ) {
    this.questionsComponent.addQuestion(this);
  }

  public show(options: AnimationOptions): Promise<HTMLElement> {
    console.log('show ' + this.number, options);
    this._hidden = false; // to enable animation
    return this._cardComponent.show(options)
    .then((element) => {
      console.log('show finished');
      return element;
    }, (error) => {
      // Animation restarted
      // this._hidden = false;
      // this._hidden = true;
    });
  }

  public hide(options: AnimationOptions): Promise<HTMLElement> {
    console.log('hide ' + this.number, options);
    this._hidden = false;
    return this._cardComponent.hide(options)
    .then((element) => {
      console.log('hide finsihed');
      this._hidden = true;
      return element;
    }, (error) => {
      // Animation restarted
      // this._hidden = false;
      // this._hidden = true;
    });
  }

  get questionsComponent(): QuestionsComponent {
    return this._questionsComponent;
  }

  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    this._wasActive = this._active;
    this._active = active;
  }

  get wasActive(): boolean {
    return this._active;
  }

  set wasActive(wasActive: boolean) {
    this._wasActive = wasActive;
  }

  get hidden(): boolean {
    return this._hidden;
  }

  set hidden(hidden: boolean) {
    this._hidden = hidden;
  }

  get number(): number {
    return this._number;
  }

  set number(number: number) {
    this._number = number;
  }

}
