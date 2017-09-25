import Rx from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { Injectable, EventEmitter, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';

import { shuffle, scrollTo } from 'app/helpers';
import { TrackTransformer } from 'app/support';
import { PlaylistService } from 'app/services';

import Playlist from 'app/models/playlist';
import Track from 'app/models/track';
import { Question, QuestionType } from 'app/models/question';

// import mockPlaylist from 'app/mock/playlist';

@Injectable()
export class QuizService {

  private _scrollDuration = 100;

  private _onReady = new EventEmitter<void>();
  private _onActivateQuestion = new EventEmitter<number>();
  private _onCompleted = new EventEmitter<void>();
  private _onClose = new EventEmitter<void>();
  private _onRefresh = new EventEmitter<void>();

  private _numberOfQuestions: number;
  private _progress: number;
  private _playlist: Playlist;
  private _tracks: Track[];
  private _random: Track[];
  private _questions: Question[];

  constructor(private playlistService: PlaylistService) {

  }

  public init(numberOfQuestions: number): Rx.Observable<Question[]> {
    this._numberOfQuestions = numberOfQuestions;

    /**
     * Uncomment the following line and the mockPlaylist
     * import above, to prevent Spotify API calls.
     */
    // return this.loadExistingData(mockPlaylist);

    return this.loadProductionData();
  }

  public ready() {
    scrollTo(document.body, 0, this._scrollDuration).then(() => {
      this._onReady.emit();
    });
  }

  public close() {
    scrollTo(document.body, 0, this._scrollDuration).then(() => {
      this.onClose.emit();
    });
  }

  public refresh() {
    this._progress = 0;
    this._playlist = null;
    this._tracks = [];
    this._random = [];
    this._questions = [];

    this.init(this._numberOfQuestions)
      .first()
      .subscribe((questions: Question[]) => {
        scrollTo(document.body, 0, this._scrollDuration).then(() => {
          this.onRefresh.emit();
        });
      });
  }

  public activateQuestion(questionNumber: number) {
    scrollTo(document.body, 0, this._scrollDuration).then(() => {
      this._onActivateQuestion.emit(questionNumber);
    });
  }

  public completed() {
    scrollTo(document.body, 0, this._scrollDuration).then(() => {
      this._onCompleted.emit();
    });
  }

  public progress() {
    return this.calculateProgress();
  }

  get onReady() {
    return this._onReady;
  }

  get onActivateQuestion() {
    return this._onActivateQuestion;
  }

  get onCompleted() {
    return this._onCompleted;
  }

  get onClose() {
    return this._onClose;
  }

  get onRefresh() {
    return this._onRefresh;
  }

  public getCorrectAnswer(question: Question) {
    for (let answer of question.answers) {
      if (answer.correct) {
        return answer;
      }
    }

    return null;
  }

  private loadProductionData(): Rx.Observable<Question[]> {
    return this.playlistService.getPlaylist()
      .map((playlist: Playlist) => this.extractTracks(playlist))
      .map((tracks: Track[]) => this.extractRandom(tracks))
      .map((tracks: Track[]) => this.buildQuestions(tracks));
  }

  private loadExistingData(data: Playlist, delay = 1000): Rx.Observable<Question[]> {
    return Rx.Observable.of(data)
      .delay(delay)
      .map((playlist: Playlist) => this.extractTracks(playlist))
      .map((tracks: Track[]) => this.extractRandom(tracks))
      .map((tracks: Track[]) => this.buildQuestions(tracks));
  }

  private calculateProgress() {
    let count = 0;

    for (let question of this.questions) {
      if (question.status.answered) {
        count++;
      }
    }

    return (count / this.totalQuestions) * 100;
  }

  private buildQuestions(randomTracks: Track[]) {
    let trackTransformer = new TrackTransformer(this._playlist, this._tracks);
    let questions: Question[] = [];
    let count = 0;

    for (let track of randomTracks) {
      count++;

      let type = count === 1 ? QuestionType.TrackNameFromPreview : null;
      let question = trackTransformer.toQuestion(track, type);

      questions.push(question);
    }

    count = 1;
    this._questions = shuffle(questions.slice(1)).map((question) => {
      question.id = ++count;
      return question;
    });

    questions[0].id = 1;
    this._questions.unshift(questions[0]);

    return this._questions;
  }

  private extractTracks(playlist: Playlist) {
    let tracks: Track[] = [];

    playlist.tracks.items.forEach((item, key) => {
      tracks.push(item.track);
    });

    this._playlist = playlist;
    this._tracks = tracks;

    return tracks;
  }

  private extractRandom(tracks: Track[]) {
    return this._random = this.getRandomTracks(this._numberOfQuestions);
  }

  private getRandomTracks(amount: number): Track[] {
    let randomTracks: Track[] = [];
    let taken: number[] = [];

    for (let i = 0; i < amount; i++) {
      let current: number;
      let track: Track;

      do {
        current = Math.floor(Math.random() * this._tracks.length);
        track = this._tracks[current];
      } while (
        taken.indexOf(current) >= 0 ||
        !track.preview_url ||
        !track.album ||
        !track.album.images ||
        !track.album.images[0] ||
        !track.album.images[0].url
      );

      taken.push(current);
      randomTracks.push(track);
    }

    return randomTracks;
  }

  get totalQuestions(): number {
    return this.questions.length;
  }

  get questions(): Question[] {
    return this._questions || [];
  }

}

export default QuizService;
