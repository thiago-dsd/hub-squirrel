import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CreateCampaignControllerService {
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
  
//   public async  getConversations(
//   ) : Promise<Conversation[]> {  
//     try {
//       const { data: conversations} = await this.http.get('message/conversation', {
//         params: {
//           limit: 10,
//           offset: 0,
//           created_at: 'desc',
//         }
//       });
//       console.log('Lista completa de Conversations:', conversations);
//       return conversations;
//     } catch (error) {
//       console.error('ContactsController.getMessagingProducts', error);
//       throw error;
//     }
//   }

  

//   public async sendMessage(message: SendMessage) {
//     try {
//       const response = await this.http.post('message/whatsapp', message);
//       console.log('sendMessage', response);
//       return response;
//     } catch (error) {
//       console.error('ContactsController.sendMessage', error);
//       throw error;
//     }
//   }
}
