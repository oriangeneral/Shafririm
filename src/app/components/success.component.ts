import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';

import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { Dilema } from '../models/dilema.model';
import {BlService} from '../services/bl.service';

import {ActivatedRoute} from '@angular/router';
import {Option} from '../models/option.model';
import {Scenario} from '../models/scenario.model';
import {Category} from '../models/category.model';


@Component({
  selector: 'app-success',
  styles: [`
    .success-wrapper{
      width: 100%;
      height: 100%;
      background-image: url('../../assets/images/sky.jpeg');
      background-repeat: round;
      background-size: 100%;
      color: #ffffff;
    }
  `],
  template: `
    <div fxLayout="column" class="success-wrapper">
      <div fxFlex="20"></div>
      <h1 class="header horizontal-alignment-center margin-top-0">סיימת בהצלחה</h1>
      <h1 class="horizontal-alignment-center">יפה מאוד</h1>
    </div>
  `
})
export class SuccessComponent implements OnInit {

  constructor(private blService: BlService, private route: ActivatedRoute) {
  }

  public ngOnInit() {

  }
}

export default SuccessComponent;
