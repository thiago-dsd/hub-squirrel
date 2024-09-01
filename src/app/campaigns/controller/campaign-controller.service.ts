import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.development';
import { Campaign } from '../entity/campaign.entity';

@Injectable({
  providedIn: 'root',
})
export class CampaignControllerService {
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
  
  public async  getAllCampaigns(
  ) : Promise<Campaign[]> {  
    try {
      const { data: campaigns} = await this.http.get('campaign', {
        params: {
          limit: 10,
          offset: 0,
          created_at: 'desc',
          updated_at: 'desc',
        }
      });
      return campaigns;
    } catch (error) {
      console.error('CampaignController.getAllConversations', error);
      throw error;
    }
  }

  

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
