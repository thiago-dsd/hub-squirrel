import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserControllerService } from './controller/user-controller.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserControllerService,
  ]
})
export class UserModule { }
