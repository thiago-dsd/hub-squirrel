import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StartCampaignControllerService } from './controller/start-campaign-controller.service';
import { CampaignWebsocketService } from './websocket/campaign-websocket-controller.service';
import { Subscription } from 'rxjs';

// Função utilitária para verificar erros
function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

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
  errorMessages: string[] = [];
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
        this.errorMessages.push('WebSocket error: ' + (isErrorWithMessage(error) ? error.message : 'Unknown error'));
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

  async handleFileUpload(event: any) {
    this.isLoading = true;
    this.errorMessages = [];
    this.updates = [];

    try {
      const file: File = event.target.files[0];
      if (!file) {
        this.selectedFileName = null;
        return;
      }

      this.selectedFileName = file.name;

      const reader = new FileReader();

      reader.onload = async (e: any) => {
        try {
          const jsonContent: any[] = JSON.parse(e.target.result);
          this.messagesToSend = jsonContent;
          await this.sendMessagesInCampaign();
        } catch (parseError) {
          this.errorMessages.push('Erro ao analisar o conteúdo do arquivo JSON: ' + (isErrorWithMessage(parseError) ? parseError.message : 'Unknown error'));
          console.error('Erro ao analisar o conteúdo do arquivo JSON:', parseError);
        }
      };

      reader.readAsText(file);
    } catch (error) {
      this.errorMessages.push('Erro ao processar o arquivo selecionado: ' + (isErrorWithMessage(error) ? error.message : 'Unknown error'));
      console.error('Erro ao processar o arquivo selecionado:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private async sendMessagesInCampaign() {
    this.isLoading = true;
    this.errorMessages = [];

    try {
      for (const message of this.messagesToSend) {
        const campaign = {
          campaign_id: this.campaignId!,
          sender_data: message,
        };

        await this.startCampaignController.postCreateModel(campaign);
      }
    } catch (error) {
      this.errorMessages.push('Erro ao enviar mensagens para a campanha: ' + (isErrorWithMessage(error) ? error.message : 'Unknown error'));
      console.error('Erro ao enviar mensagens para a campanha:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async sendCampaign() {
    this.isLoading = true;
    this.errorMessages = [];

    try {
      await this.campaignWebsocketService.sendCampaign();
    } catch (error) {
      this.errorMessages.push('Erro ao iniciar a campanha: ' + (isErrorWithMessage(error) ? error.message : 'Unknown error'));
      console.error('Erro ao iniciar a campanha:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async verifyStatus() {
    this.isLoading = true;
    this.errorMessages = [];

    try {
      await this.campaignWebsocketService.sendStatusRequest();
    } catch (error) {
      this.errorMessages.push('Erro ao verificar o status: ' + (isErrorWithMessage(error) ? error.message : 'Unknown error'));
      console.error('Erro ao verificar o status:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
