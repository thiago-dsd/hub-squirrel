import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.css'
})
export class CampaignsComponent {
  constructor(private router: Router) {}

  navigateToCreateCampaign() {
    this.router.navigate(['/create-campaign']);
  }
}
