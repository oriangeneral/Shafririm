import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'landing',
  styleUrls: ['./landing.less', './landing-animations.less'],
  templateUrl: './landing.html',
  directives: [
    ROUTER_DIRECTIVES
  ]
})
export class LandingComponent {

}
