import { Component, Inject, OnInit } from '@angular/core';
import { Router, Routes, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router';

import { AnimationService } from 'css-animator';
import { LandingComponent } from '../landing/landing.component';
import { QuizComponent } from '../quiz/quiz.component';

import { MaterializeDirective } from "angular2-materialize";

import appTemplate from './app.html';

@Component({
  selector: 'app',
  template: appTemplate,
  directives: [
    ROUTER_DIRECTIVES,
    MaterializeDirective
  ],
  providers: [
    ROUTER_PROVIDERS,
    AnimationService
  ]
})
@Routes([
  {
    path: '/',
    component: LandingComponent
  },
  {
    path: '/quiz',
    component: QuizComponent
  }
])
export class AppComponent implements OnInit {

  private _animator: AnimationBuilder;

  // DO NOT REMOVE THE ROUTER INJECTION
  // It will break loading LandingComponent automatically
  constructor(private router: Router, animationService: AnimationService) {
    console.log('Hello from app component.');
    this._animator = animationService.builder();
  }

  public ngOnInit() {
    let loadingElem = document.getElementById('app-loading');
    let spinningElem = loadingElem.querySelector('.loader');

    this._animator
      .setDuration(600)
      .setType('fadeOut')
      .hide(loadingElem)
      .then(() => {
        // if (!this.isActiveRoute('/')) {
        //   this.router.navigate(['/']);
        // }
        spinningElem.classList.remove('running');
      });

  }

  private isActiveRoute(route: string) {
    return this.router.serializeUrl(this.router.urlTree) === this.router.serializeUrl((this.router.createUrlTree([route])));
  }

}
