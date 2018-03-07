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
      margin:0px auto;
    }

    .example-full-width {
      width: 100%;
    }
    
    .login{
      width: 100%;
      height: 100%;
      background-image: url('../../assets/images/park3.jpeg');
      background-repeat: round;
      background-size: 100%;
      color: #ffffff;
    }
    .login-button{
      position: absolute;
      left: 50%;
    }
  `],
  template: `
    
    <div fxLayout="column" class="login">
      <div fxFlex="20"></div>
      <div fxFlex>
        <h1 class="horizontal-alignment-center margin-top-0 header">ברוכים הבאים</h1>
        <h1 class="horizontal-alignment-center">מרחב למידה חוויתי</h1>
        <form class="example-form" dir="rtl">
          <mat-form-field class="example-full-width">
            <input type="text" placeholder="שם משתמש" aria-label="Number" matInput [formControl]="myControl" [matAutocomplete]="auto">
            <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
              <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
                {{ option }}
              </mat-option>
            </mat-autocomplete>
          </mat-form-field>
        </form>
        <a mat-button href="/#/categories" class="login-button">כניסה</a>
      </div>
      <div fxFlex="20"></div>
    </div>
  `
})
export class LoginComponent {
  myControl: FormControl = new FormControl();
  options = [];//['One', 'Two', 'Three'];
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
