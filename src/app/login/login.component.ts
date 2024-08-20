import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthControllerService } from '../auth/controller/auth-controller.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  someError: boolean = false;
  emailPassWordError: boolean = false;
  isLoading: boolean = false;

  private readonly redirectAfter: string = "/contacts";

  constructor(
    private readonly auth: AuthControllerService,
    private router: Router
  ) {}

  async emailAndPasswordLogin() {
    this.resetError();
    this.isLoading = true;
    
    try {
      console.log('entrou no try - emailAndPasswordLogin - loginComponent');
      const response = await this.auth.login();
      // this.router.navigate([this.redirectAfter]);
    } catch (error) {
      console.error('Error during login:', error);
      this.emailPassWordError = true;
    } finally {
      this.isLoading = false;
    }
  }

  resetError() {
    this.someError = false;
    this.emailPassWordError = false;
  }
}
