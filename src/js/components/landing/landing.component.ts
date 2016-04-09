import { Component } from 'angular2/core';
import { RouterLink } from 'angular2/router';

@Component({
  selector: 'landing',
  styleUrls: ['./landing.less', './landing-animations.less'],
  templateUrl: './landing.html',
  directives: [
    RouterLink
  ]
})
export class LandingComponent {

}
