import {EntityBase} from './entity-base';
import {Dilema} from './dilema.model';

export class Option extends EntityBase {

  desc: string;
  remarks: string;
  score: number;
  mediaUrl: string;
  dilema: Dilema;
  nextDilema: Dilema;

}
