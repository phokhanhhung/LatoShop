import { Routes } from '@angular/router';
import { title } from 'process';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent), title: "Welcome to LatoShop"},
  {path: 'product-detail', loadComponent: () => import('./product-detail/product-detail.component').then(c => c.ProductDetailComponent), title: 'Find more things about your sweater on LatoShop'},
  {path: 'profile', loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent), title: 'View your profile on LatoShop'},
];
