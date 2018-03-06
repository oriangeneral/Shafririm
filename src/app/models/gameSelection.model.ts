import {EntityBase} from './entity-base';
import {Game} from './game.model';
import {Option} from './option.model';

export class GameSelection extends EntityBase {
  game: Game;
  option: Option;
}
