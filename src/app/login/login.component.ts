import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { DiscountComponent } from '../discount/discount.component';
import { FooterComponent } from '../footer/footer.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, ProductDetailComponent, DiscountComponent, ContactComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private subscription: Subscription;
  isLoggedIn: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.subscription = this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
