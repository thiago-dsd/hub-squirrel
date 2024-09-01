import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.development';
import { Campaign } from '../entity/campaign.entity';
import { MessagingProduct } from '../entity/messaging-product.entity';

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

  public async postCreateCampaign(messaging_product_id: string, name: string) {  
    try {
      const { data: campaigns} = await this.http.post('campaign', {
        "messaging_product_id": messaging_product_id,
        "name": name
      });
    } catch (error) {
      console.error('CampaignController.postCreateCampaign', error);
      throw error;
    }
  }

  public async deleteCampaign(campaign_id: string) {  
    try {
      const { data: campaigns} = await this.http.delete('campaign', {
        data: {"id": campaign_id}
      });
    } catch (error) {
      console.error('CampaignController.deleteCampaign', error);
      throw error;
    }
  }

  public async patchEditCampaign(id: string, messaging_product_id: string, name: string) {  
    try {
      const { data: campaigns} = await this.http.patch('campaign', {
        "id": id,
        "messaging_product_id": messaging_product_id,
        "name": name
      });
    } catch (error) {
      console.error('CampaignController.putCampaign', error);
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
    return messagingProducts;
  } catch (error) {
    console.error('ContactsController.getMessagingProducts', error);
    throw error;
  }
}
}
