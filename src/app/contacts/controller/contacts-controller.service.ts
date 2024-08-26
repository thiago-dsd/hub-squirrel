import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.development';
import { Token } from '@angular/compiler';
import { MessagingProduct } from '../entity/messaging-product.entity';
import { Conversation } from '../entity/conversation.entity';
import { Message } from '../entity/messsage.entity';

@Injectable({
  providedIn: 'root',
})
export class ContactControllerService {
  private readonly prefix: string = `${environment.apiUrl}`;
  private http: AxiosInstance = axios.create(
    {
      baseURL: this.prefix,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  
  public async  getConversations(
  ) : Promise<Conversation[]> {  
    try {
      const { data: conversations} = await this.http.get('message/conversation', {
        params: {
          limit: 10,
          offset: 0,
          created_at: 'desc',
        }
      });
      console.log('Lista completa de Conversations:', conversations);
      return conversations;
    } catch (error) {
      console.error('ContactsController.getMessagingProducts', error);
      throw error;
    }
  }

  public async  getMessagingProducts(
    ) : Promise<MessagingProduct[]> {  
    try {
      const { data: messagingProducts} = await this.http.get('messaging-product', {
        params: {
          limit: 10,
        }
      });


    console.log('Lista completa de Messaging Products:', messagingProducts);
      return messagingProducts;
    } catch (error) {
      console.error('ContactsController.getMessagingProducts', error);
      throw error;
    }
  }
  
  public async getConversationHistory(from_id: string) : Promise<Message[]> {
    try {
      // console.log('message/conversation/messaging-product-contact/' + from_id)
      // console.log('My from_id: ', from_id);
      const {data: conversationHistory} = await this.http.get('message/conversation/messaging-product-contact/' + from_id, {
        params: {
          limit: 20,
          offset: 0,
          created_at: 'desc',
        },
      });
      // console.log('Histórico da conversa:', conversationHistory);
      return conversationHistory;
    } catch (error) {
      console.error('ContactsController.getMessagingProducts', error);
      throw error;
    }
  }
}
