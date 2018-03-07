import {Component, OnInit} from '@angular/core';
import {BlService} from '../services/bl.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'categories',
  styles: [`
    .categories-wrapper{
      width: 100%;
      height: 100%;
      background-image: url('../../assets/images/park2.jpeg');
      background-repeat: round;
      background-size: 100%;
      color: #ffffff;
    }
    .minimized {
      max-width: 30%
    }
  `],
  template: `
    <div fxLayout="column" class="categories-wrapper">
      <div fxFlex="20"></div>
      <h1 class="header horizontal-alignment-center margin-top-0">מרחב למידה חוויתי</h1>
      <h1  class="horizontal-alignment-center">בחר מגרש משחקים</h1>
      <div  class="horizontal-alignment-center" fxLayout="column">
        <div fxFlex>
          <mat-progress-bar *ngIf="isBusy" mode="query"></mat-progress-bar>
          <div *ngFor="let c of categories" style="display: inline; float: right; min-width: 30%; padding: 20px" >
            <a [href]="'#/categories/'+c.id">
              <mat-card class="example-card">
                <mat-card-header>
                  <mat-card-title><div class="header">{{c.title}}</div></mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>
                    {{c.desc}}
                  </p>
                </mat-card-content>
              </mat-card>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CategoriesComponent implements OnInit{
  public categories = [];
  public scenarios = [];
  public isBusy: boolean = false;

  constructor(private route: ActivatedRoute,
              private blService: BlService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isBusy = true;
      this.blService.getCategories().subscribe(data => {
        this.isBusy = false;
        this.categories = data;
      });
    });
  }

}
