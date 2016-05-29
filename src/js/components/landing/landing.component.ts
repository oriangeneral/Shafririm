import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import landingTemplate from './landing.html';
import landingStyle from './landing.css';

import { MaterializeDirective } from "angular2-materialize";

@Component({
  selector: 'landing',
  template: landingTemplate,
  styles: [landingStyle],
  directives: [
    ROUTER_DIRECTIVES,
    MaterializeDirective
  ]
})
export class LandingComponent {

  constructor() {
    this.selectOptions = [
      {
        name: 'Austria',
        value: 'at'
      },
      {
        name: 'Germany',
        value: 'de'
      }
    ]
  }

}
