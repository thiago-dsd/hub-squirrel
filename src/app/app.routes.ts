import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { StatisticsComponent } from './statistics/statistics.component';

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
        path: 'statistics',
        component: StatisticsComponent,
    },
    {
        path: '',
        redirectTo: "contacts",
        pathMatch: 'full',
    },
];
