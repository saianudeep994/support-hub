import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { LoginComponent } from './pages/login/login';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard';
import { AgentDashboardComponent } from './pages/agent-dashboard/agent-dashboard';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel';
import { HomeDashboardComponent } from './pages/home/home';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeDashboardComponent },
      { path: 'customer', component: CustomerDashboardComponent },
      { path: 'agent', component: AgentDashboardComponent },
      { path: 'ticket', component: TicketDetailComponent },
      { path: 'admin', component: AdminPanelComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' }
    ]
  }
];
