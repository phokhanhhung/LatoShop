declare var google: any;

import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);

  private isSessionStorageAvailable: boolean = typeof sessionStorage !== 'undefined';

  //Get user information to display on header
  name = this.isSessionStorageAvailable && JSON.parse(sessionStorage.getItem('userInfo'))?.name;
  email = this.isSessionStorageAvailable && JSON.parse(sessionStorage.getItem('userInfo'))?.email;
  avatar = this.isSessionStorageAvailable && JSON.parse(sessionStorage.getItem('userInfo'))?.picture;

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '837742596297-j894sgkpglq12rqkf1r1v6mp6cv7h8ia.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response),
    })

    google.accounts.id.renderButton(document.getElementById("google-sign-in-btn"), {
      theme: 'filled_black',
      size: 'medium',
      shape: 'rectangle',
      width: 200
    })
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    //Decode the token
    const payload = this.decodeToken(response.credential);

    this.name = payload.name;
    this.email = payload.email;
    this.avatar = payload.picture;

    //Store user info in session storage
    sessionStorage.setItem("userInfo", JSON.stringify(payload));

    //Navigate to product detail page
    this.router.navigate(['product-detail']);
  }
  
  //Check if user logged in or not
  isLoggedIn() {
    return this.isSessionStorageAvailable && !!JSON.parse(sessionStorage.getItem('userInfo')!) && !!JSON.parse(sessionStorage.getItem('userInfo')!).name;
  }
}
