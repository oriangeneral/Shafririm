import { Injectable } from 'angular2/core';

import { Playlist } from '../types/playlist';
import { PLAYLIST } from '../mock/playlist';

@Injectable()
export class SpotifyService {

  public getRandomPlaylist() {
    return new Promise<Playlist[]>(resolve =>
      setTimeout(() => resolve(PLAYLIST), 2000)
      );
  }

}
