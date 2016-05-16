import { Component, Inject, OnInit } from '@angular/core';
import { Router, Routes, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router';

import { AnimationService } from 'css-animator';
import { LandingComponent } from '../landing/landing.component';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app',
  styleUrls: ['./app.less'],
  templateUrl: './app.html',
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

  constructor(private router: Router) {}

  public ngOnInit() {
    this.router.navigate(['/']);
  }

}
