import {Injectable} from '@angular/core';
import {Scenario} from '../models/scenario.model';
import {User} from '../models/user.model';
import {Dilema} from '../models/dilema.model';
import {BlProxyService} from './bl-proxy.service';
import {Constants} from '../constants';
import {Option} from '../models/option.model';
import {Observable} from 'rxjs/Observable';
import {Category} from '../models/category.model';

@Injectable()
export class BlService {
  public currentUser: User;

  constructor(private blProxyService: BlProxyService) {
  }

  public getDilemaOptions(dilemaId: number): Observable<Option[]> {
    return this.blProxyService.getNested({
      'dilemas': dilemaId,
      'options': null
    });
  }

  public getDilema(dilemaId: number): Observable<Dilema> {
    return this.blProxyService.getNested({
      'dilemas': dilemaId
    });
  }

  public getScenarios(categoryId: number): Observable<Scenario[]> {
    return this.blProxyService.getNested({
      'categories': categoryId,
      'scenario': null,
    });
  }

  public getCategory(categoryId: number): Observable<Category> {
    return this.blProxyService.getNested({
      'categories': categoryId,
    });
  }

  public getCategories() {
    return this.blProxyService.getAll(Constants.CATEGORY);
  }

  public login() {
    return this.blProxyService.post(Constants.USER, this.currentUser);
  }
}
