import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { CampaignControllerService } from './controller/campaign-controller.service';
import { Campaign } from './entity/campaign.entity';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.css'
})
export class CampaignsComponent {
  isLoading: boolean = false;
  allCampaigns: Campaign[] = [];

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
}
