import {EntityBase} from './entity-base';
import {Category} from './category.model';

export class Scenario extends EntityBase {
  title: string;
  desc: string;
  createdDate: Date;
  updatedDate: Date;
  category: Category;
  firstDilema: number;
  level: number;
  status: number;
}
