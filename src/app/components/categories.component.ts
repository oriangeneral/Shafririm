import {Component, OnInit} from '@angular/core';
import {BlService} from '../services/bl.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'categories',
  styles: [`
  `],
  template: `
    <div fxLayout="column">
      <div fxFlex>
        <div *ngFor="let c of categories">
          <a [href]="'#/categories/'+c.id">{{c.title}}</a>
        </div>
      </div>
      
      
      <div fxFlex>
        <div *ngIf="selectedCategory != undefined">
          <h3>תרחישים</h3>
          <div *ngFor="let s of scenarios">
            <a [href]="'#/scenarios/'+s.id">{{s.title}}</a>
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

    this.blService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = this.route.snapshot.params['categoryId'];
      this.onSelectedCategory();
    });
  }

  onSelectedCategory(){
    this.blService.getScenarios(this.selectedCategory).subscribe(data => {
      this.scenarios = data;
    });
  }

}
