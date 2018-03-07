import {LoginComponent} from './components/login.component';
import {Routes} from '@angular/router';
import {CategoriesComponent} from './components/categories.component';
import DilemaComponent from './components/dilema.component';
import CategoryComponent from './components/category.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'categories/:categoryId',
    component: CategoryComponent
  },
  {
    path: 'categories/:categoryId',
    component: CategoryComponent
  },
  {
    path: 'dilemas/:dilemaId',
    component: DilemaComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
