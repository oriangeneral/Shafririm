import { Album } from './album';
import { Artist } from './artist';
import { Image } from './image';
import { Track } from './track';

export interface Item {
  added_at: string;
  added_by: any;
  is_local: boolean;
  // href: string;
  track: Track;
}
