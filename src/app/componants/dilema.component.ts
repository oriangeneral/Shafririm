import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';

import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { Dilema } from '../models/dilema.model';
import {BlService} from '../services/bl.service';

import template from './dilema.html';
import {ActivatedRoute} from '@angular/router';
import {Option} from '../models/option.model';


@Component({
  selector: 'app-dilema',
  template: template,
  styles: [
    // mainStyle
  ]
})
export class DilemaComponent implements OnInit {
  @Input() public dilema: Dilema;
  private options: Option[] = [];

  constructor(private blService: BlService, private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit() {
    this.blService.getDilemaOptions(this.activatedRoute.params.categoryId,
      this.activatedRoute.params.scenarioId,
      this.activatedRoute.params.dilemaId
    ).subscribe(data => {
      this.options = data;
    });
  }
}

export default DilemaComponent;
