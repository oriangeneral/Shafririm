import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { TrackTransformer } from '../support/TrackTransformer';

import { PlaylistService } from './playlist.service';
import { QuestionsComponent } from '../components/questions/questions.component';

import { shuffle } from '../helpers/common';

import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import { Question, QuestionType } from '../models/question';

@Injectable()
export class QuizService {

  private _questionsComponent: QuestionsComponent;
  private _playlist: Playlist;
  private _tracks: Track[];
  private _random: Track[];
  private _questions: Question[];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getPlaylist()
      .map((playlist) => this.extractTracks(playlist))
      .map((tracks) => this.extractRandom(tracks))
      .subscribe(
        (tracks) => this.buildQuestions(tracks),
        error => console.error(error)
      );
  }

  private buildQuestions(randomTracks: Track[]) {
    let trackTransformer = new TrackTransformer(this._playlist, this._tracks);
    let questions: Question[] = [];

    for (let track of randomTracks) {
      questions.push(trackTransformer.toQuestion(track));
    }

    console.log(questions);

    this._questions = shuffle(questions);
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
    return this._random = this.getRandomTracks(10);
  }

  private getRandomTracks(amount: number): Track[] {
    let randomTracks: Track[] = [];
    let taken: number[] = [];

    for (let i = 0; i < amount; i++) {
      let current: number;

      do {
        current = Math.floor(Math.random() * this._tracks.length);
      } while (taken.indexOf(current) >= 0);

      taken.push(current);
      randomTracks.push(this._tracks[current]);
    }

    return randomTracks;
  }

  get totalQuestions(): number {
    return this.questions.length;
  }

  get questionsComponent(): QuestionsComponent {
    return this._questionsComponent;
  }

  set questionsComponent(questionsComponent: QuestionsComponent) {
    this._questionsComponent = questionsComponent;
  }

  get questions(): Question[] {
    return this._questions || [];
  }

}
