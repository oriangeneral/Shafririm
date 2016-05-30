import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { MaterializeDirective } from "angular2-materialize";
import { AnimationService } from 'css-animator';
import { RegionOptions, REGION_VALUES } from './region_options';

import landingTemplate from './landing.html';
import landingStyle from './landing.css';

@Component({
  selector: 'landing',
  host: {
    'hidden': true
  },
  template: landingTemplate,
  styles: [landingStyle],
  directives: [
    MaterializeDirective
  ]
})
export class LandingComponent implements AfterViewInit {

  public selectOptions: RegionOptions[] = REGION_VALUES;

  private _animator: AnimationBuilder;
  private _regionSelection: any;

  constructor(
    private _elementRef: ElementRef,
    private router: Router,
    animationService: AnimationService) {
    this._animator = animationService.builder();
  }

  get regionSelection() {
    return this._regionSelection;
  }

  set regionSelection(value) {
    this._regionSelection = value;
  }

  public startQuiz() {
    if (this.submitted) {
      return;
    }

    this.submitted = true;

    this._animator
      .setType('fadeOutDown')
      .setDelay(350)
      .setDuration(600)
      .hide(this._elementRef.nativeElement)
      .then(() => {
        this.router.navigate(['/quiz']);
      });
  }

  public ngAfterViewInit() {
    this._animator
      .setType('fadeInUp')
      .setDelay(200)
      .setDuration(600)
      .show(this._elementRef.nativeElement);
  }

}
