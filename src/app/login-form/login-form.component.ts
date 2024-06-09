declare var google: any;

import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  @Output() isLoggedIn  = new EventEmitter<boolean>();
  container: HTMLElement;
  router = inject(Router);

  constructor(private elRef: ElementRef, private renderer: Renderer2, private auth: AuthService) {}

  ngAfterViewInit() {
    this.container = this.elRef.nativeElement.querySelector('#container');
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '837742596297-j894sgkpglq12rqkf1r1v6mp6cv7h8ia.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response),
    })

    google.accounts.id.renderButton(document.getElementById("google-sign-in-btn"), {
      theme: 'filled_blue',
      size: 'medium',
      shape: 'rectangle',
      width: 284
    })

    google.accounts.id.renderButton(document.getElementById("google-sign-in-btn-1"), {
      theme: 'filled_blue',
      size: 'medium',
      shape: 'rectangle',
      width: 284
    })
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    //Decode the token
    const payload = this.decodeToken(response.credential);

    //Store user info in session storage
    sessionStorage.setItem("userInfo", JSON.stringify(payload));

    this.auth.updateLoginStatus();

    this.isLoggedIn.emit(true);
  }

  handleSignUp() {
    this.container.classList.add("right-panel-active");
  }

  handleSignIn() {
    this.container.classList.remove("right-panel-active");
  }
}
