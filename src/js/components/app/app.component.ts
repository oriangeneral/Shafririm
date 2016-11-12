import { Component, OnInit } from '@angular/core';

import { AnimationService } from 'css-animator';
import { Unsubscriber } from 'app/components';
import { LocaleService, PlaylistService } from 'app/services';

import template from './app.html';

@Component({
  selector: 'app',
  template: template,
  providers: [
    AnimationService,
    LocaleService,
    PlaylistService
  ]
})
export class AppComponent implements OnInit {

  private _animator: AnimationBuilder;

  constructor(animationService: AnimationService) {
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

}

export default AppComponent;
