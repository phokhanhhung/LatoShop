import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private isSessionStorageAvailable: boolean = typeof sessionStorage !== 'undefined';

  auth = inject(AuthService);

  signOut() {
    sessionStorage.removeItem("userInfo")
    this.auth.signOut();
  }

  //Get user information to display on profile page
  name = this.isSessionStorageAvailable && JSON.parse(sessionStorage.getItem('userInfo'))?.name;
  email = this.isSessionStorageAvailable && JSON.parse(sessionStorage.getItem('userInfo'))?.email;
  avatar = this.isSessionStorageAvailable && JSON.parse(sessionStorage.getItem('userInfo'))?.picture;
}
