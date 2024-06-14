// System Utils
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Installed Utils
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// App Utils
import { AdminDashboardLayoutComponent } from '../../../../shared/layouts/dashboard/admin-dashboard-layout.component';
import { IconComponent } from '../../../../shared/general/icon/icon.component';

// Configuration
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TranslateModule,
    AdminDashboardLayoutComponent,
    IconComponent,
  ],
  templateUrl: './dashboard.component.html',
})

// Logic
export class DashboardComponent {
  constructor(
    private readonly title: Title,
    private readonly translateService: TranslateService,
  ) {
    // Set Page Title
    this.translateService.get('dashboard').subscribe((pageTitle: string) => {
      this.title.setTitle(pageTitle);
    });
  }
}