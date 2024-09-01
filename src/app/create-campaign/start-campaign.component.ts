import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from './entity/model.entity';
import { StartCampaignControllerService } from './controller/start-campaign-controller.service';
import { SendModel } from './entity/send-model';
import { CampaignWebsocketService } from './websocket/campaign-websocket-controller.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './start-campaign.component.html',
  styleUrl: './start-campaign.component.css'
})
export class StartCampaignComponent {
  isLoading: boolean = false;
  campaignId: string | null = null;
  selectedModel: Model | null = null;
  allModels: Model[] = [];
  private wsSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute, 
    private readonly startCampaignController: StartCampaignControllerService, 
    private readonly campaignWebsocketService: CampaignWebsocketService,
  ) {}

  ngOnInit() {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    this.getAllModelsByCampaignId(this.campaignId!);
    console.log(this.campaignId)

    this.campaignWebsocketService.connect(this.campaignId!);
    this.wsSubscription = this.campaignWebsocketService.getCampaignSubject().subscribe(
      (message) => {
        console.log("Message received:", message);
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );
  }

  ngOnDestroy() {
    this.campaignWebsocketService.disconnectSocket();
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  test(){
    this.campaignWebsocketService.sendStatusRequest();
  }

  selectModel(model: Model) {
    this.selectedModel = model;
  }

  async getAllModelsByCampaignId(campaignId: string) {
    this.isLoading = true;

    try {
      const response = await this.startCampaignController.getAllModelsByCampaignId(campaignId);
      this.allModels = response;
    } catch (error) {
      console.error('StartCampaignComponent.getAllModelsByCampaignId()', error);
    } finally {
      this.isLoading = false;
    }
  }

  async createModel(messageText: string) {
    this.isLoading = true;

    try {
      const sendModel: SendModel = {
        campaign_id: this.campaignId!,
        sender_data: {
          messaging_product: "e5653550-450b-4dc9-8c35-33132e415fa3",
          text: {
            body: messageText,
            preview_url: true
          },
          to: "string",
          type: "text"
        }
      };

      // Enviando o objeto para o controlador
      const response = await this.startCampaignController.postCreateModel(sendModel);
      
    } catch (error) {
      console.error('StartCampaignComponent.createModel()', error);
    } finally {
      this.getAllModelsByCampaignId(this.campaignId!);
      this.isLoading = false;
    }
  }


  async deleteModel(modelId: string) {
    this.isLoading = true;

    try {
      const response = await this.startCampaignController.deleteModel(modelId);
      this.getAllModelsByCampaignId(this.campaignId!);
    } catch (error) {
      console.error('StartCampaignComponent.deleteModel()', error);
    } finally {
      this.isLoading = false;
    }
  }
}
