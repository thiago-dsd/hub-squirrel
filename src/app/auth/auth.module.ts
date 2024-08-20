import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthControllerService } from './controller/auth-controller.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthControllerService,
  ],
})
export class AuthModule {}
