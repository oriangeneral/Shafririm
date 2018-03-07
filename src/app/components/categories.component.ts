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
      background-repeat: no-repeat;
      background-size: 100%;
    }
  `],
  template: `
    <div class="categories-wrapper">
      
      <h1>מרחב למידה חוויתי</h1>
      <h2>בחר מגרש לשחק?</h2>
      <div fxLayout="column">
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
  public selectedCategory = undefined;

  constructor(private route: ActivatedRoute,
              private blService: BlService) {

    this.route.params.subscribe(params => {
      this.selectedCategory = this.route.snapshot.params['categoryId'];
      this.onSelectedCategory(this.selectedCategory);
    });

    this.blService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = this.route.snapshot.params['categoryId'];
      this.onSelectedCategory(this.selectedCategory);
    });
  }

  onSelectedCategory(selectedCategory){
    this.blService.getScenarios(selectedCategory).subscribe(data => {
      this.scenarios = data;
    });
  }

}
