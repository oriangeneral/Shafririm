import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AnimationService, AnimationBuilder } from 'css-animator';
import { MaterializeDirective } from 'angular2-materialize';

import { LocaleService } from 'app/services/locale.service';
import { RegionOptions, REGION_VALUES } from './region_options';

import template from './landing.html';
import mainStyle from './landing.css';

@Component({
  selector: 'landing',
  host: {
    'hidden': true
  },
  template: template,
  styles: [
    mainStyle
  ],
  directives: [
    MaterializeDirective
  ]
})
export class LandingComponent implements OnInit, AfterViewInit {

  public selectOptions: RegionOptions[] = REGION_VALUES;

  private _animator: AnimationBuilder;
  private _regionSelection: any;

  constructor(
    private _elementRef: ElementRef,
    private router: Router,
    private _localeService: LocaleService,
    animationService: AnimationService) {
    this._animator = animationService.builder();
  }

  public ngOnInit() {
    this._regionSelection = this._localeService.locale;
  }

  public ngAfterViewInit() {
    this._animator
      .setType('fadeInUp')
      .setDelay(150)
      .setDuration(700)
      .show(this._elementRef.nativeElement);
  }

  get regionSelection() {
    return this._regionSelection;
  }

  set regionSelection(value) {
    this._localeService.locale = value;
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

}
