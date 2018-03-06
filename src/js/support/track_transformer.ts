import { shuffle } from 'app/helpers';

import { Playlist, Track, Dilema, QuestionType } from 'app/contracts';

export class TrackTransformer {

  constructor(private _playlist: Playlist, private _tracks: Track[]) { }

  public toQuestion(track: Track, type?: QuestionType): Dilema {
    let questionType: string;
    let functionName: string;

    if (!type) {
      questionType = QuestionType[Math.floor(Math.random() * (Object.keys(QuestionType).length / 2))];
    } else {
      questionType = QuestionType[type];
    }

    functionName = `to${questionType}Question`;

    if (typeof this[functionName] !== 'function') {
      throw new Error('This question type does not exist.');
    }

    return this[functionName](track);
  }

  public toAlbumNameFromImageQuestion(track: Track): Dilema {
    let question: Dilema = {
      type: QuestionType.AlbumNameFromImage,
      title: 'What is the name of this album?',
      options: [
        {
          title: track.album.name,
          correct: true
        }
      ],
      answered: false,
      status: {
        answered: false
      },
      track: track
    };

    for (let randomTrack of this.randomTracksExcluding(3, track.id)) {
      question.options.push({
        title: randomTrack.album.name,
        correct: false
      });
    }

    shuffle(question.options);

    return question;
  }

  public toTrackNameFromPreviewQuestion(track: Track): Dilema {
    let question: Dilema = {
      type: QuestionType.TrackNameFromPreview,
      title: 'What is the name of this song?',
      description: 'You can play 30 seconds of the song.',
      options: [
        {
          title: track.name,
          correct: true
        }
      ],
      answered: false,
      status: {
        answered: false
      },
      track: track
    };

    for (let randomTrack of this.randomTracksExcluding(3, track.id)) {
      question.options.push({
        title: randomTrack.name,
        correct: false
      });
    }

    shuffle(question.options);

    return question;
  }

  public toArtistNameFromTrackNameQuestion(track: Track): Dilema {
    let question: Dilema = {
      type: QuestionType.ArtistNameFromTrackName,
      title: 'Who is the artist of this track?',
      options: [
        {
          title: track.artists[0].name,
          correct: true
        }
      ],
      answered: false,
      status: {
        answered: false
      },
      track: track
    };

    for (let randomTrack of this.randomTracksExcluding(3, track.id)) {
      question.options.push({
        title: randomTrack.artists[0].name,
        correct: false
      });
    }

    shuffle(question.options);

    return question;
  }

  public toArtistNameFromAlbumNameQuestion(track: Track): Dilema {
    let question: Dilema = {
      type: QuestionType.ArtistNameFromAlbumName,
      title: 'Who is the artist of this album?',
      options: [
        {
          title: track.artists[0].name,
          correct: true
        }
      ],
      answered: false,
      status: {
        answered: false
      },
      track: track
    };

    for (let randomTrack of this.randomTracksExcluding(3, track.id)) {
      question.options.push({
        title: randomTrack.artists[0].name,
        correct: false
      });
    }

    shuffle(question.options);

    return question;
  }

  public toReleaseDateFromTrackNameQuestion(track: Track): Dilema {
    return null;
  }

  public toReleaseDateFromAlbumNameQuestion(track: Track): Dilema {
    return null;
  }

  private randomTracksExcluding(amount: number, exclude: string): Track[] {
    let randomTracks: Track[] = [];
    let taken: number[] = [];

    for (let i = 0; i < amount; i++) {
      let current: number;

      do {
        current = Math.floor(Math.random() * this._tracks.length);
      } while (taken.indexOf(current) >= 0 || this._tracks[current].id === exclude);

      taken.push(current);
      randomTracks.push(this._tracks[current]);
    }

    return randomTracks;
  }

}

export default TrackTransformer;
