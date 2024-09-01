import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';

export const routes: Routes = [
    {
        path: 'contacts',
        component: ContactsComponent,
    },
    {
        path: 'campaigns',
        component: CampaignsComponent,
    },
    {
        path: 'create-campaign',
        component: CreateCampaignComponent,
    },
    {
        path: 'statistics',
        component: StatisticsComponent,
    }, 
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        redirectTo: "login",
        pathMatch: 'full',
    },
];
