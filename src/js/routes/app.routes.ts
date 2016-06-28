import { provideRouter, RouterConfig } from '@angular/router';
import { LandingComponent } from 'app/components/landing/landing.component';
import { QuizComponent } from 'app/components/quiz/quiz.component';

export const routes: RouterConfig = [
  { path: '', component: LandingComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
