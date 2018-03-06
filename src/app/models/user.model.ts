import {EntityBase} from './entity-base';

export class User extends EntityBase {
  name: string;
  level: number;
  createDate: Date;
  updatedDate: Date;
}
