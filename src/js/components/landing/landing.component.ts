import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import landingTemplate from './landing.html';
import landingStyle from './landing.css';
import landingAnimations from './landing-animations.css';

@Component({
  selector: 'landing',
  styles: [
    landingStyle,
    landingAnimations
  ],
  template: landingTemplate,
  directives: [
    ROUTER_DIRECTIVES
  ]
})
export class LandingComponent {

}
