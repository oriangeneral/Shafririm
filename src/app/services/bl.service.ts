import {Injectable} from '@angular/core';
import {Scenario} from '../models/scenario.model';
import {User} from '../models/user.model';
import {Dilema} from '../models/dilema.model';
import {BlProxyService} from './bl-proxy.service';
import {Constants} from '../constants';

@Injectable()
export class BlService {
  public currentScenario: Scenario;
  public currentDilema: Dilema;
  public currentUser: User;

  constructor(private blProxyService: BlProxyService) {
  }

  public getScenarios() {
    return this.blProxyService.getAll(Constants.SCENARIO);
  }

  public login() {
    return this.blProxyService.post(Constants.USER, this.currentUser);
  }
}
