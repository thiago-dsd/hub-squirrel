import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { CampaignControllerService } from './controller/campaign-controller.service';
import { Campaign } from './entity/campaign.entity';
import { MessagingProduct } from './entity/messaging-product.entity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, MenuComponent, FormsModule],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.css'
})
export class CampaignsComponent {
  isLoading: boolean = false;
  isCreatingCampaign: boolean = false;
  allCampaigns: Campaign[] = [];
  allMessagingProducts: MessagingProduct[] = [];
  selectedCampaign: Campaign | null = null;

  constructor(
    private router: Router,
    private readonly campaignController: CampaignControllerService,
  ) {}

  navigateToCreateCampaign() {
    this.router.navigate(['/create-campaign']);
  }

  ngOnInit() {
    this.getAllCampaigns();
  }

  openCreateCampaignModal(state: boolean){
    this.getAllMessagingProducts();
    this.isCreatingCampaign = state
  }

  closeCreateCampaignModal(state: boolean){
    this.isCreatingCampaign = state
  }

  campaignName: string = '';
  selectedMessagingProductId: string = '';

  onSubmitCampaignForm() {
    if (this.campaignName && this.selectedMessagingProductId) {
      this.createCampaign(this.selectedMessagingProductId, this.campaignName);
      this.closeCreateCampaignModal(true);
    } else {
      // Caso queira, você pode adicionar uma lógica de feedback para o usuário aqui.
      console.error('Nome da campanha ou plataforma não selecionados.');
    }
  }

  async getAllCampaigns() {
    this.isLoading = true;

    try {
      const response = await this.campaignController.getAllCampaigns();
      this.allCampaigns = response;
    } catch (error) {
      console.error('ContactsComponent.allMessagingProducts()', error);
    } finally {
      this.isLoading = false;
    }
  }

  async createCampaign(messaging_product_id: string, name: string) {
    this.isLoading = true;
 
    try {
      const response = await this.campaignController.postCreateCampaign(messaging_product_id, name);
    } catch (error) {
      console.error('ContactsComponent.createCampaign()', error);
    } finally {
      this.isLoading = false;
      this.getAllCampaigns();
    }
  }

  async deleteCampaign(campaign_id: string) {
    this.isLoading = true;

    try {
      const response = await this.campaignController.deleteCampaign(campaign_id);
    } catch (error) {
      console.error('ContactsComponent.createCampaign()', error);
    } finally {
      this.selectedCampaign = null;
      this.isLoading = false;
      this.getAllCampaigns();
    }
  }

  async patchEditCampaign(id: string, messaging_product_id: string, name: string) {
    this.isLoading = true;

    try {
      const response = await this.campaignController.patchEditCampaign(id, messaging_product_id, name);
    } catch (error) {
      console.error('ContactsComponent.patchEditCampaign()', error);
    } finally {
      this.isLoading = false;
      this.getAllCampaigns();
    }
  }

  async getAllMessagingProducts() {
    this.isLoading = true;

    try {
      const response = await this.campaignController.getMessagingProducts();
      this.allMessagingProducts = response;
    } catch (error) {
      console.error('CampaignComponent.allMessagingProducts()', error);
    } finally {
      this.isLoading = false;
    }
  }
}
