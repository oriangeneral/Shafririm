import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';

import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';

import {Dilema} from '../models/dilema.model';
import {BlService} from '../services/bl.service';

import {ActivatedRoute} from '@angular/router';
import {Option} from '../models/option.model';


@Component({
  selector: 'app-dilema',
  styles: [`
    .dilema-wrapper {
      width: 100%;
      height: 100%;
      background-image: url('../../assets/images/sky.jpeg');
      background-repeat: round;
      background-size: 100%;
      color: #ffffff;
    }
  `],
  template: `
    <div fxLayout="column" class="dilema-wrapper">
      <div fxFlex="20"></div>
      <h1 class="header horizontal-alignment-center margin-top-0">{{dilema.title}}</h1>
      <h1 class="header horizontal-alignment-center">{{dilema.desc}}</h1>
      <div fxFlex>
        <div *ngFor="let option of options" class="div-wrapper">
          <a [href]="'/#/dilemas/' + option.nextDilema.id">

            <mat-card class="example-card">
              <mat-card-header>
                <mat-card-title>
                  <div class="title">{{option.title}}</div>
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>
                  {{option.desc}}
                </p>
              </mat-card-content>
            </mat-card>
          </a>
        </div>
      </div>
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
