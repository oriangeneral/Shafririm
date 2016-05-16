import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { PlaylistService } from './playlist.service';
import { QuestionsComponent } from '../components/questions/questions.component';

import { Track } from '../models/track';

@Injectable()
export class QuizService {

  private _questionsComponent: QuestionsComponent;
  private _totalQuestions = 0;
  private _tracks: Track[];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getPlaylist().subscribe(
      playlist => this._totalQuestions = 5,
      error => console.error(error)
      );

    if (this._totalQuestions > this.playlistService.tracks.length) {
      this._totalQuestions = this.playlistService.tracks.length;
    }
    this._tracks = this.getRandomTracks(this._totalQuestions);
  }

  private getRandomTracks(amount: number): Track[] {
    let count: number;
    let playlistTracks: Track[] = this.playlistService.tracks;
    let randomTracks: Track[] = [];
    let taken: number[] = [];

    try {
      count = parseInt("" + amount, 10);      // For type safety
    } catch (e) {
      count = 5;
      throw new Error('No valid no. of questions provided.');
    }

    for (let i = 0; i < count; i++) {

      let current: number;
      do {
        current = Math.floor(Math.random() * playlistTracks.length);
      } while (taken.indexOf(current) >= 0);
      taken.push(current);
      randomTracks.push(playlistTracks[current]);
    }

    return randomTracks;
  }

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  get questionsComponent(): QuestionsComponent {
    return this._questionsComponent;
  }

  set questionsComponent(questionsComponent: QuestionsComponent) {
    this._questionsComponent = questionsComponent;
  }

  get tracks(): Track[] {
    return this._tracks || [];
  }

}
