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
    }
  `],
  template: `
    <div fxLayout="column" class="categories-wrapper">
      <div fxFlex="20"></div>
      <h1  class="horizontal-alignment-center margin-top-0">מרחב למידה חוויתי</h1>
      <h2  class="horizontal-alignment-center">בחר מגרש לשחק</h2>
      <div  class="horizontal-alignment-center" fxLayout="column">
        <div fxFlex>
          <div *ngFor="let c of categories">
            <a [href]="'#/categories/'+c.id" mat-button color="primary">{{c.title}}</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CategoriesComponent implements OnInit{
  public categories = [];
  public scenarios = [];

  constructor(private route: ActivatedRoute,
              private blService: BlService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.blService.getCategories().subscribe(data => {
        this.categories = data;
      });
    });
  }

}
