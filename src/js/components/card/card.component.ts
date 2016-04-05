import { Component, Input } from 'angular2/core';
import { RouterLink } from 'angular2/router';

@Component({
  selector: 'card',
  templateUrl: './card.html',
  styleUrls: ['card.less', 'card-animations.less'],
  directives: [
    RouterLink
  ]
})
export class CardComponent {
  @Input() public cardType;
}
