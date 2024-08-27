import { Component } from '@angular/core';
import { ContactControllerService } from './controller/contacts-controller.service';
import { Router } from '@angular/router';
import { MessagingProduct } from './entity/messaging-product.entity';
import { CommonModule } from '@angular/common';
import { Conversation } from './entity/conversation.entity';
import { response } from 'express';
import { Message } from './entity/messsage.entity';
import { SendMessage } from './entity/send-message.entity';

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
  currentConversation: Conversation | null = null;
  conversationHistory: Message[] = [];


  constructor(
    private readonly auth: ContactControllerService,
    private router: Router
  ) {}

  ngOnInit() {
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
  
  async getConversationHistory(selectedConversation: Conversation){
    this.resetError();
    this.isLoading = true;

    try{
      this.currentConversation = selectedConversation;
      const response = await this.auth.getConversationHistory(selectedConversation?.from_id || "");
      console.log("conversationHistory in components.ts = ", response.length);     
      this.conversationHistory = response;
    } catch (error){
      console.error('ContactsComponent.getConversationHistory()', error);
    } finally{
      this.isLoading = false;
    }
  }

  async sendMessage(messageInput: string){
    this.resetError();
    this.isLoading = true;

    console.log("messageInput = ", messageInput)

    try{
      const message: SendMessage = {
        sender_data: {
          messaging_product: "whatsapp",
          text: {
            body: messageInput,
            preview_url: true
          },
          to: this.currentConversation?.product_data?.from ?? "",
          type: "text"
        },
        to_id: this.currentConversation?.from_id ?? ""
      };

      const response = await this.auth.sendMessage(message);   
    } catch (error){
      console.error('ContactsComponent.sendMessage()', error);
    } finally{
      this.isLoading = false;
    }
  }

  resetError() {
    this.someError = false;
  }

  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
