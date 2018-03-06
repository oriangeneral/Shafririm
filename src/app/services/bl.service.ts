import {Injectable} from '@angular/core';
import {Scenario} from '../models/scenario.model';
import {User} from '../models/user.model';
import {Dilema} from '../models/dilema.model';
import {BlProxyService} from './bl-proxy.service';
import {Constants} from '../constants';
import {Option} from '../models/option.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BlService {
  public currentUser: User;

  constructor(private blProxyService: BlProxyService, activatedRoute) {
  }

  public getDilemaOptions(categoryId: number, scenarioId: number, dilemaId: number): Observable<Option[]> {
    return this.blProxyService.getNested({
      'categories': categoryId,
      'scenario': scenarioId,
      'dilema': dilemaId,
      'options': null
    });
  }

  public getDilema(categoryId: number, scenarioId: number, dilemaId: number): Observable<Dilema> {
    return this.blProxyService.getNested({
      'categories': categoryId,
      'scenario': scenarioId,
      'dilema': dilemaId
    });
  }

  public getScenarios() {
    return this.blProxyService.getAll(Constants.SCENARIO);
  }

  public getCategories() {
    return this.blProxyService.getAll(Constants.CATEGORY);
  }

  public login() {
    return this.blProxyService.post(Constants.USER, this.currentUser);
  }
}
