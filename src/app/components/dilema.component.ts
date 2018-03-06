import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';

import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { Dilema } from '../models/dilema.model';
import {BlService} from '../services/bl.service';

import {ActivatedRoute} from '@angular/router';
import {Option} from '../models/option.model';


@Component({
  selector: 'app-dilema',
  template: `
    <h3>{{dilema.title}}</h3>
    <p>{{dilema.description}}</p>
    <div *ngFor="let option of options">
      <a [href]="'#/categories/' + categoryId +'/scenarios/' + scenarioId + '/' + option.nextDilemaId">{{option.title}}</a>
    </div>
  `
})
export class DilemaComponent implements OnInit {
  private categoryId: number;
  private scenarioId: number;
  private dilemaId: number;
  private dilema: Dilema;
  private options: Option[] = [];

  constructor(private blService: BlService, private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit() {
    this.categoryId = this.activatedRoute.params['categoryId'];
    this.scenarioId = this.activatedRoute.params['scenarioId'];
    this.dilemaId = this.activatedRoute.params['dilemaId'];
    this.blService.getDilemaOptions(
      this.dilemaId
    ).subscribe(data => {
      this.options = data;
    });

    this.blService.getDilema(
      this.dilemaId
    ).subscribe(data => {
      this.dilema = data;
    });
  }
}

export default DilemaComponent;
