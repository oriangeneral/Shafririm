import { Component, ElementRef, AfterViewInit } from 'angular2/core';
import { RouterLink } from 'angular2/router';

// import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'landing',
  styleUrls: ['./landing.less', './landing-animations.less'],
  templateUrl: './landing.html',
  directives: [
    RouterLink
  ]
})
export class LandingComponent implements AfterViewInit {

  public constructor(
    private _elementRef: ElementRef
    // , private _animationService: AnimationService
  ) { }

  public ngAfterViewInit() {
    // let animation = this._animationService.builder();
    //
    // animation.setDuration(0)
    //   .setFromStyles({
    //     opacity: 0
    //   })
    //   .setToStyles({
    //     opacity: 1
    //   })
    //   .addAnimationClass('animated')
    //   .addAnimationClass('fadeInDown');

    // animation.start(this._elementRef.nativeElement);
  }

}
