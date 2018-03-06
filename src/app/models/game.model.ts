import {EntityBase} from './entity-base';
import {User} from './user.model';
import {Scenario} from './scenario.model';

export class Game extends EntityBase {
  user: User;
  Scenario: Scenario;
  createdDate: Date;
  updatedDate: Date;
}
