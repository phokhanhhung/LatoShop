import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private subscription: Subscription;
  isLoggedIn: boolean;
  name: string;
  email: string;
  avatar: string;
  loginForm: HTMLElement;
  // constructor(, private renderer: Renderer2, private auth: AuthService) {}

  ngAfterViewInit() {
    this.loginForm = this.elRef.nativeElement.querySelector("#login-form-wrapper");
  }
  constructor(private elRef: ElementRef, private auth: AuthService) {}

  private isSessionStorageAvailable: boolean = typeof sessionStorage !== 'undefined';

  ngOnInit() {
    this.subscription = this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;

      if (isLoggedIn) {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.name = userInfo?.name;
        this.email = userInfo?.email;
        this.avatar = userInfo?.picture;
      } else {
        this.name = null;
        this.email = null;
        this.avatar = null;
      }
    });
  }

  handleCloseForm(e?: any) {
    console.log("closes")
    e.stopPropagation();
    this.loginForm.classList.remove("display");
  }

  handleOpenForm() {
    console.log("click open")
    this.loginForm.classList.add("display");
  }

  handleSignOut() {
    sessionStorage.removeItem("userInfo")
    this.auth.signOut();
    this.auth.updateLoginStatus();
  }

  checkLogIn(isLoggedIn: boolean) {
    console.log("ckeck", isLoggedIn)
    if(isLoggedIn) {
      this.loginForm.classList.remove("display");
    }
  }

}
