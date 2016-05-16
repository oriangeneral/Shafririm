export enum QuestionType {
  AlbumNameFromImage,
  TrackNameFromPreview,
  ArtistNameFromTrackName,
  ArtistNameFromAlbumName,
  ReleaseDateFromTrackName,
  ReleaseDateFromAlbumName,
  TrackOnAlbumByName,
  TrackPositionOnDisk
}

export interface Answer {
  title: string;
  correct: boolean;
}

export interface Question {
  type: QuestionType;
  title: string;
  description: string;
  answers: Answer[];
  answered: boolean;
}
