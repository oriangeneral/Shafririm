import { Component, Inject, OnInit } from '@angular/core';
import { Router, Routes, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router';

import { AnimationService } from 'css-animator';
import { LandingComponent } from '../landing/landing.component';
import { QuizComponent } from '../quiz/quiz.component';

import appTemplate from './app.html';
import appStyle from './app.css';

@Component({
  selector: 'app',
  styles: [ appStyle ],
  template: appTemplate,
  directives: [
    ROUTER_DIRECTIVES
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

  constructor(private router: Router) {
    console.log('Hello from app component.');
  }

  public ngOnInit() {
    this.router.navigate(['/']);
  }

}
