import { Routes } from '@angular/router';
import { title } from 'process';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent), title: "Welcome to LatoShop"}
];