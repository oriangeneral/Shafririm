import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AnimationOptions } from 'css-animator';
import { CardComponent } from '../../card/card.component';
import { QuestionsComponent } from '../questions.component';

import questionTemplate from './question.html';
import questionStyle from './question.css';

@Component({
  selector: 'question',
  template: questionTemplate,
  styles: [ questionStyle ],
  directives: [
    ROUTER_DIRECTIVES
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
    this._hidden = false; // To actually see the animation
    return this._cardComponent.show(options)
    .then((element) => {
      return element;
    }, (error) => {
      // Animation interrupted
    });
  }

  public hide(options: AnimationOptions): Promise<HTMLElement> {
    this._hidden = false;
    return this._cardComponent.hide(options)
    .then((element) => {
      this._hidden = true;
      return element;
    }, (error) => {
      // Animation interrupted
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
