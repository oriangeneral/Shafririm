import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from 'app/components/landing/landing.component';
import { QuizComponent } from 'app/components/quiz/quiz.component';



const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

// import { provideRouter, RouterConfig } from '@angular/router';
// import { LandingComponent } from 'app/components/landing/landing.component';
// import { QuizComponent } from 'app/components/quiz/quiz.component';
//
// export const routes: RouterConfig = [
//   { path: '', component: LandingComponent },
//   { path: 'quiz', component: QuizComponent },
//   { path: '**', redirectTo: '' }
// ];
//
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];
