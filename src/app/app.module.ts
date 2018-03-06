import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BlProxyService} from './services/bl-proxy.service';
import {BlService} from './services/bl.service';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from "./components/login.component";
import {CategoriesComponent} from "./components/categories.component";
import {RouterModule, Routes} from "@angular/router";
import {routes} from "./routes";
import {MatButton, MatButtonModule} from "@angular/material";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriesComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [
    BlProxyService,
    BlService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
