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
      <a [href]="'/#/dilemas/' + option.nextDilema.id">{{option.title}}</a>
    </div>
  `
})
export class DilemaComponent implements OnInit {
  private categoryId: number;
  private scenarioId: number;
  private dilemaId: number;
  private dilema: Dilema = new Dilema();
  private options: Option[] = [];

  constructor(private blService: BlService, private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = this.route.snapshot.params['categoryId'];
      this.scenarioId = this.route.snapshot.params['scenarioId'];
      this.dilemaId = this.route.snapshot.params['dilemaId'];
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
    });

  }
}

export default DilemaComponent;
