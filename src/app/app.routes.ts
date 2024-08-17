import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ModelComponent } from './model/model.component';
import { LoginComponent } from './login/login.component';

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
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        redirectTo: "login",
        pathMatch: 'full',
    },
];
