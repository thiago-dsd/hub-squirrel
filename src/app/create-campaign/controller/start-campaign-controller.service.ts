import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../../enviroments/environment.development';
import { Model } from '../entity/model.entity';
import { SendModel } from '../entity/send-model';

@Injectable({
  providedIn: 'root',
})
export class StartCampaignControllerService {
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
  
    public async  getAllModelsByCampaignId(campaign_id: string) : Promise<Model[]> {  
      try {
        const { data: models } = await this.http.get('campaign/message', {
          params: {
            campaign_id: campaign_id,
            limit: 10,
            offset: 0,
            created_at: 'desc',
            updated_at: 'desc',
          }
        });

        return models;
      } catch (error) {
        console.error('StartCampaignController.getAllModelsByCampaignId', error);
        throw error;
      }
    }

    public async postCreateModel(send_model: SendModel) {  
      try {
        const { data: Model} = await this.http.post('campaign/message', send_model);
      } catch (error) {
        console.error('StartCampaignController.postCreateModel', error);
        throw error;
      }
    }

    public async deleteModel(campaign_id: string) {  
      try {
        const { data: Model} = await this.http.delete('campaign/message', {
          data: {"id": campaign_id}
        });
      } catch (error) {
        console.error('StartCampaignController.deleteModel', error);
        throw error;
      }
    }
}
