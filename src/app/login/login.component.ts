import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthControllerService } from '../auth/controller/auth-controller.service';
import { error } from 'node:console';
import { Token } from '../auth/entity/auth.entity';


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
  emailAndPassWordError: boolean = false;
  isLoading: boolean = false;

  private readonly redirectAfter: string = "/contacts";

  constructor(
    private readonly auth: AuthControllerService,
    private router: Router
  ) {}

  async emailAndPasswordLogin(
    email: string,
    password: string,
  ) {
    this.resetError();
    this.isLoading = true;

      const response = await this.auth.login(email, password)
      .then(() => {
          this.isLoading = false;
          this.router.navigate([this.redirectAfter]);

          
          
        })
      .catch((error) => {
        this.isLoading = false;
        this.emailAndPassWordError
      })

    this.isLoading = false;
  }

  resetError() {
    this.someError = false;
    this.emailAndPassWordError = false;
  }
}
