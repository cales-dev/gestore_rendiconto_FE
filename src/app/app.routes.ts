import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailsComponent } from './pages/details/details.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path:'dashboard', component: DashboardComponent }, // Default route
  { path: 'details', component: DetailsComponent},
  { path: 'settings', component: SettingsComponent},  
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo:'dashboard', pathMatch:"full"},// Default route
];

