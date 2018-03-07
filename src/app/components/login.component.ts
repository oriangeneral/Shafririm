import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


@Component({
  selector: 'login',
  styles: [`
    .example-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .example-full-width {
      width: 100%;
    }
    
    .login{
      width: 100%;
      height: 100%;
      background-image: url('../../assets/images/parkImg.jpg');
      background-repeat: no-repeat;
      background-size: 100%;
    }
  `],
  template: `    
    <div class="login">
      <h1>ברוכים הבאים</h1>
      <h2>מרחב למידה חוויתי</h2>
      <form class="example-form">
        <mat-form-field class="example-full-width">
          <input type="text" placeholder="שם משתמש" aria-label="Number" matInput [formControl]="myControl" [matAutocomplete]="auto">
          <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
            <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
              {{ option }}
            </mat-option>
          </mat-autocomplete>
        </mat-form-field>
      </form>
    
    <!--<button mat-button>Click me!</button>-->
      <a mat-button href="/#/categories">Click me!</a>
    </div>
  `
})
export class LoginComponent {
  myControl: FormControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}
