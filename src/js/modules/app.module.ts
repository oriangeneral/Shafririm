import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { routing } from 'app/routes/app.routes';
import { AppErrorHandler } from 'app/facades/error_handler';

import { AnimatesDirective } from 'css-animator';
import { MaterializeDirective } from "angular2-materialize";

import { AppComponent } from 'app/components/app/app.component';
import { LandingComponent } from 'app/components/landing/landing.component';
import { QuizComponent } from 'app/components/quiz/quiz.component';
import { QuizNavComponent } from 'app/components/quiz/nav/quiz-nav.component';
import { QuizCardComponent } from 'app/components/quiz/card/quiz-card.component';
import { QuizDoneComponent } from 'app/components/quiz/done/quiz-done.component';
import { QuizStatusComponent } from 'app/components/quiz/status/quiz-status.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AnimatesDirective,
    MaterializeDirective,
    AppComponent,
    LandingComponent,
    QuizComponent,
    QuizNavComponent,
    QuizCardComponent,
    QuizDoneComponent,
    QuizStatusComponent
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
