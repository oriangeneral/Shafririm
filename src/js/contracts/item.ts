import Track from 'app/contracts/track';

export interface Item {
  added_at: string;
  added_by: any;
  is_local: boolean;
  // href: string;
  track: Track;
}

export default Item;
