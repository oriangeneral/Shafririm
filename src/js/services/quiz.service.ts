import { Injectable, Inject, DynamicComponentLoader, ElementRef, ComponentRef } from 'angular2/core';

import { Playlist } from '../models/playlist';
import { SpotifyService } from './spotify.service';

// import { PlayComponent } from '../components/quiz/questions/play/play.component';
// import { SelectComponent } from '../components/quiz/questions/select/select.component';
import * as Questions from '../components/quiz/questions/questions';

@Injectable()
export class QuizService {

  private _initialized: boolean = false;
  private _playlist: Playlist[] = [];
  private _activeQuestion: number = 0;
  private _totalQuestions: number = 0;
  private _elementRef: ElementRef;

  constructor(
    private _dcl: DynamicComponentLoader,
    private _spotifyService: SpotifyService
    ) { }

  public init(elementRef: ElementRef): Promise<number> {
    this._elementRef = elementRef;
    this._totalQuestions = 0;
    this._activeQuestion = 0;
    this._playlist = [];

    return this.loadQuestions()
      .then(() => this.buildQuestions())
      .then(() => {
        this.activeQuestion = 1;
        this._initialized = true;
        return this.totalQuestions;
      });
  }

  public loadQuestions(): Promise<Playlist[]> {
    return this._spotifyService.getRandomPlaylist()
      .then(playlist => this._playlist = playlist);
  }

  public buildQuestions(): Promise<number> {
    // Just an example how to load a component dynamically
    return this._dcl.loadIntoLocation(Questions.SelectComponent, this._elementRef, 'questions')
      .then((compRef: ComponentRef) => {
      compRef.instance.questionNumber = 1;
      this.totalQuestions++;
      return this._dcl.loadIntoLocation(Questions.PlayComponent, this._elementRef, 'questions');
    })
      .then((compRef: ComponentRef) => {
      this.totalQuestions++;
      compRef.instance.questionNumber = 2;
    })
      .catch((e) => console.log('Error while loading question cards', e))
      .then(() => this.totalQuestions);
  }

  public nextQuestion(e) {
    this._activeQuestion++;
  }

  public previousQuestion() {
    this._activeQuestion--;
  }

  get playlist(): Playlist[] {
    return this._playlist;
  }

  get activeQuestion(): number {
    return this._activeQuestion;
  }

  set activeQuestion(activeQuestion: number) {
    this._activeQuestion = activeQuestion;
  }

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  set totalQuestions(totalQuestions: number) {
    this._totalQuestions = totalQuestions;
  }

  get elementRef(): ElementRef {
    return this._elementRef;
  }

  set elementRef(elementRef: ElementRef) {
    this._elementRef = elementRef;
  }

}
