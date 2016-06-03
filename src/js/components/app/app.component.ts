import { Component, OnInit } from '@angular/core';
import { Router, Routes, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router';

import { AnimationService } from 'css-animator';
import { LocaleService } from 'app/services/locale.service';
import { PlaylistService } from 'app/services/playlist.service';

import { LandingComponent } from '../landing/landing.component';
import { QuizComponent } from '../quiz/quiz.component';

import template from './app.html';

@Component({
  selector: 'app',
  template: template,
  directives: [
    ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS,
    AnimationService,
    LocaleService,
    PlaylistService
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
  constructor(private _router: Router, animationService: AnimationService) {
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
        spinningElem.classList.remove('running');
      });

  }

  private isActiveRoute(route: string) {
    return this._router.serializeUrl(this._router.urlTree) === this._router.serializeUrl((this._router.createUrlTree([route])));
  }

}
