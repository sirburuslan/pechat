// System Utils
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// App Utils
import { AdminGuard } from '../../../core/guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PlansComponent } from './plans/plans.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from '../../errors/not-found/not-found.component';
import { AdminDashboardLayoutComponent } from '../../../shared/layouts/dashboard/admin-dashboard-layout.component';

// Supported routes
const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'plans',
        component: PlansComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

// Configuration
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})

// Logic
export class AdminRoutingModule {}
