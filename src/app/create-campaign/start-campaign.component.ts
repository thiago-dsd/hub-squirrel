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
  private wsSubscription: Subscription | undefined;
  campaignId: string | null = null;
  messagesToSend: any[] = [];
  selectedFileName: string | null = null;
  updates: string[] = [];
  isLoading: boolean = false;
  
  constructor(
    private route: ActivatedRoute, 
    private readonly startCampaignController: StartCampaignControllerService, 
    private readonly campaignWebsocketService: CampaignWebsocketService,
  ) {}

  ngOnInit() {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    this.campaignWebsocketService.connect(this.campaignId!);
    this.wsSubscription = this.campaignWebsocketService.getCampaignSubject().subscribe(
      (message) => {
        this.updates.push(message);
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.selectedFileName = file.name;

      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        try {
          const jsonContent: any[] = JSON.parse(e.target.result);
          this.messagesToSend = jsonContent;
        } catch (err) {
          console.error('StartCampaignComponent.onFileSelected()', err);
        }
      };

      reader.readAsText(file);
    } else {
      this.selectedFileName = null;
    }
  }

  async createCampaignMessage(){
    try{
      this.messagesToSend.map( async (value) => {
        const campaign: any = {
          campaign_id: this.campaignId!,
          "sender_data": value
        };
        const response = await this.startCampaignController.postCreateModel(campaign);
      })
    } catch (error){
      console.error('StartCampaignComponent.createCampaignMessage()', error);
    } finally{
      this.isLoading = false;
    }
  }

  sendCampaign(){
    this.campaignWebsocketService.sendCampaign();
  }

  verifyStatus(){
    this.campaignWebsocketService.sendStatusRequest();
  }
}
