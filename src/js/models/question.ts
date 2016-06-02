import { Track } from './track';
import { Status } from './status';

export enum QuestionType {
  AlbumNameFromImage,
  TrackNameFromPreview,
  ArtistNameFromTrackName,
  ArtistNameFromAlbumName
  // ,ReleaseDateFromTrackName,
  // ReleaseDateFromAlbumName
}

export interface Question {
  id?: number;
  type: QuestionType;
  title: string;
  description?: string;
  answers: Answer[];
  answered?: boolean;
  track: Track;
  status: Status;
}

export interface Answer {
  title: string;
  correct: boolean;
}
