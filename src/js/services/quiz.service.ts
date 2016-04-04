import { Injectable } from 'angular2/core';

import { Playlist } from '../models/playlist';
import { SpotifyService } from './spotify.service';

@Injectable()
export class QuizService {

  private _playlist: Playlist[] = [];
  private _activeQuestion: number = 0;
  private _totalQuestions: number = 0;

  constructor(private _spotifyService: SpotifyService) {
    console.log('creating quiz service instance');
  }

  public loadQuestions(): Promise<Playlist[]> {
    return this._spotifyService.getRandomPlaylist()
      .then(playlist => this._playlist = playlist);
  }

  public buildQuestions() {
    // todo
  }

  public nextQuestion() {
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

}
