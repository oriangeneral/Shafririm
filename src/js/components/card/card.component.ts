import { Component, Input } from 'angular2/core';

import { AnimatesDirective } from '../../directives/animates.directive';

@Component({
  selector: 'card',
  templateUrl: './card.html',
  styleUrls: ['./card.less', './card-animations.less'],
  directives: [
    AnimatesDirective
  ]
})
export class CardComponent {

  @Input()
  public cardType;

}
