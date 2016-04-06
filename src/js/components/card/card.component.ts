import { Component, Input } from 'angular2/core';

@Component({
  selector: 'card',
  templateUrl: './card.html',
  styleUrls: ['./card.less', './card-animations.less']
})
export class CardComponent {

  @Input()
  public cardType;

}
