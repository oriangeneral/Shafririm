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
    <div *ngFor="let option of options">{{option.title}}</div>
  `
})
export class DilemaComponent implements OnInit {
  private options: Option[] = [];
  private dilema: Dilema;

  constructor(private blService: BlService, private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit() {
    this.blService.getDilemaOptions(this.activatedRoute.params['categoryId'],
      this.activatedRoute.params['scenarioId'],
      this.activatedRoute.params['dilemaId']
    ).subscribe(data => {
      this.options = data;
    });

    this.blService.getDilema(this.activatedRoute.params['categoryId'],
      this.activatedRoute.params['scenarioId'],
      this.activatedRoute.params['dilemaId']
    ).subscribe(data => {
      this.dilema = data;
    });
  }
}

export default DilemaComponent;
