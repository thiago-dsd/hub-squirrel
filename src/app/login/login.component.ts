import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/service/auth.service';
import { AuthModule } from '../auth/auth.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private readonly auth: AuthService,
    private router: Router,
  ){}


  someError: boolean = false;
  emailPassWordError: boolean = false;
  isLoading: boolean = false;

  private readonly redirectAfter: string = "/contacts";

  async emailAndPasswordLogin(
    email: string,
    password: string,
  ){
    this.resetError();
    this.isLoading = false;

    await this.auth
  }

  resetError(){
    this.someError = false;
    this.emailPassWordError = false;
  }
}
