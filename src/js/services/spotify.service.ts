import { Injectable } from 'angular2/core';

import { Playlist } from '../models/playlist';
import { PLAYLIST } from '../mock/playlist';

@Injectable()
export class SpotifyService {

  public getRandomPlaylist(): Promise<Playlist[]> {
    return new Promise<Playlist[]>(resolve =>
      setTimeout(() => resolve(PLAYLIST), 500)
      );
  }

}
