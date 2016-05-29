import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import landingTemplate from './landing.html';

@Component({
  selector: 'landing',
  template: landingTemplate,
  directives: [
    ROUTER_DIRECTIVES
  ]
})
export class LandingComponent {

}
