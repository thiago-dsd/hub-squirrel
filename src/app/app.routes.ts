import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ModelComponent } from './model/model.component';

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
        path: 'model',
        component: ModelComponent,
    },
    {
        path: '',
        redirectTo: "model",
        pathMatch: 'full',
    },
];
