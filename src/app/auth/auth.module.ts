import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthControllerService } from './controller/auth-controller.service';
import { AuthService } from './service/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthControllerService,
  ],
})
export class AuthModule {}
