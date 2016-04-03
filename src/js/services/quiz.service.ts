import { Injectable } from 'angular2/core';

import { Playlist } from '../models/playlist';
import { SpotifyService } from './spotify.service';

@Injectable()
export class QuizService {

  private _playlist: Playlist[];

  constructor(private _spotifyService: SpotifyService) { }

  public loadQuestions() {
    return this._spotifyService.getRandomPlaylist()
      .then(playlist => this._playlist = playlist);
  }

  get playlist(): Playlist[] {
    return this._playlist;
  }

}
