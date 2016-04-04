import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { LandingComponent } from '../landing/landing.component';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizService } from '../../services/quiz.service';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app',
  styleUrls: ['./app.less'],
  templateUrl: './app.html',
  directives: [
    ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS,
    SpotifyService,
    QuizService
  ]
})
@RouteConfig([
  {
    path: '/',
    name: 'Landing',
    component: LandingComponent,
    useAsDefault: true
  },
  {
    path: '/quiz/...', // Note: '...' is required to allow child routes!
    name: 'Quiz',
    component: QuizComponent
  }
])
export class AppComponent implements OnInit {

  public ngOnInit() {
    // App was bootstrapped
  }

}
