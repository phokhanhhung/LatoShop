declare var google: any;

import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isSessionStorageAvailable: boolean = typeof sessionStorage !== 'undefined';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  isLoggedIn$ = this.loggedInSubject.asObservable();

  router = inject(Router);
  constructor() {}

  signOut() {
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/'])
  }

  //Check if user logged in or not
  isLoggedIn() {
    return this.isSessionStorageAvailable && !!JSON.parse(sessionStorage.getItem('userInfo')!) && !!JSON.parse(sessionStorage.getItem('userInfo')!).name;
  }

  updateLoginStatus() {
    this.loggedInSubject.next(this.isLoggedIn());
  }
}