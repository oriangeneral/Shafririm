import {Component} from '@angular/core';
import {BlService} from '../services/bl.service';

@Component({
  selector: 'categories',
  styles: [`
  `],
  template: `
    <div *ngFor="let c of categories">
      <a [href]="'#/categories/'+c.id">{{c.id}}</a>
    </div>
  `
})
export class CategoriesComponent {
  public categories;

  constructor(private blService: BlService) {
    this.blService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
}
