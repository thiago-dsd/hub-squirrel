import { Component } from '@angular/core';
import { ContactControllerService } from './controller/contacts-controller.service';
import { Router } from '@angular/router';
import { MessagingProduct } from './entity/messaging-product.entity';
import { CommonModule } from '@angular/common';
import { Conversation } from './entity/conversation.entity';
import { response } from 'express';

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
  conversations: Conversation[] = [];


  constructor(
    private readonly auth: ContactControllerService,
    private router: Router
  ) {}

  ngAfterViewInit() {
      this.getConversations()
  }

  async allMessagingProducts() {
    this.resetError();
    this.isLoading = true;

    try{
      const response = await this.auth.getMessagingProducts();     
      this.messagingProducts = response;
    } catch (error){
      console.error('ContactsComponent.allMessagingProducts()', error);
    } finally{
      this.isLoading = false;
    }
  }

  async getConversations() {
    this.resetError();
    this.isLoading = true;
  
    try {
      const response = await this.auth.getConversations();
      this.conversations = response; 
    } catch (error) {
      console.error('ContactsComponent.getConversations()', error);
    } finally {
      this.isLoading = false;
    }
  }
  

  resetError() {
    this.someError = false;
  }
}
