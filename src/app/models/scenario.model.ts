import {EntityBase} from './entity-base';
import {Category} from './category.model';

export class Scenario extends EntityBase {
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  category: Category;
  firstDilema: number;
  level: number;
  status: number;
}
