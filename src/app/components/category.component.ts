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
  styles: [`
    .category-wrapper{
      width: 100%;
      height: 100%;
      background-image: url('../../assets/images/sky.jpeg');
      background-repeat: round;
      background-size: 100%;
      color: #ffffff;
    }
  `],
  template: `
    <div fxLayout="column" class="category-wrapper">
      <div fxFlex="20"></div>
      <h1 class="header horizontal-alignment-center margin-top-0">{{category.title}}</h1>
      <h1 class="horizontal-alignment-center">{{category.desc}}</h1>
      <h1 class="horizontal-alignment-center">בחר אפשרות</h1>
        <div fxFlex>
          <div ngFor="let scenario of scenarios" class="div-wrapper" >
            <a [href]="'/#/dilemas/' + scenario.firstDilema.id">

              <mat-card class="example-card">
                <mat-card-header>
                  <mat-card-title><div class="title">{{scenario.title}}</div></mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>
                    {{scenario.desc}}
                  </p>
                  <p>
                    {{scenario.level}}
                  </p>
                </mat-card-content>
              </mat-card>
            </a>
          </div>
        </div>
    </div>
  `
})
export class CategoryComponent implements OnInit {
  private categoryId: number;
  private category: Category = new Category();
  private scenarios: Scenario[] = [];

  constructor(private blService: BlService, private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = this.route.snapshot.params['categoryId'];
      this.blService.getScenarios(this.categoryId,
      ).subscribe(data => {
        this.scenarios = data;
      });

      this.blService.getCategory(this.categoryId
      ).subscribe(data => {
        this.category = data;
      });
    });

  }
}

export default CategoryComponent;
