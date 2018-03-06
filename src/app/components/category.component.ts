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
  selector: 'app-category',
  template: `
    <h3>{{category.title}}</h3>
    <p>{{category.description}}</p>
    <div *ngFor="let scenario of scenarios">
      <a [href]="'/#/categories/' + categoryId + '/scenarios/' + scenario.id">{{scenario.title}}</a>
    </div>
  `
})
export class CategoryComponent implements OnInit {
  private categoryId: number;
  private category: Category;
  private scenarios: Scenario[] = [];

  constructor(private blService: BlService, private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit() {
    this.categoryId = this.activatedRoute.params['value']['categoryId'];
    this.blService.getScenarios(this.categoryId,
    ).subscribe(data => {
      this.scenarios = data;
    });

    this.blService.getCategory(this.categoryId
    ).subscribe(data => {
      this.category = data;
    });
  }
}

export default CategoryComponent;
