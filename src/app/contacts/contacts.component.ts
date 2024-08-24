import { Component } from '@angular/core';
import { ContactControllerService } from './controller/contacts-controller.service';
import { Router } from '@angular/router';
import { MessagingProduct } from './entity/messaging-product.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  someError: boolean = false;
  emailAndPassWordError: boolean = false;
  isLoading: boolean = false;
  messagingProducts: MessagingProduct[] = [];


  constructor(
    private readonly auth: ContactControllerService,
    private router: Router
  ) {}

  async allMessagingProducts(
    
  ) {
    this.resetError();
    this.isLoading = true;

      // const response = await this.auth.getMessagingProducts()
      // .then(() => {
      //     this.isLoading = false;
               
      //   })
      // .catch((error) => {
      //   this.isLoading = false;
      // })

      this.messagingProducts = await this.auth.getMessagingProducts();     

    this.isLoading = false;
  }

  resetError() {
    this.someError = false;
  }
}
