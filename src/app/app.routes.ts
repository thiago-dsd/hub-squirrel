import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { StartCampaignComponent } from './create-campaign/start-campaign.component';
import { SettingsComponent } from './settings/settings.component';

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
        path: 'start-campaign/:id',
        component: StartCampaignComponent,
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
        path: 'settings',
        component: SettingsComponent,
    },
    {
        path: '',
        redirectTo: "login",
        pathMatch: 'full',
    },
];
