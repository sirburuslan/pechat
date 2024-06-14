// System Utils
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';

// Installed Utils
import { TranslateService, TranslateModule } from '@ngx-translate/core';

// App Utils
import type { UiDropdown } from '../../models/ui.model';
import { environment } from '../../../../environment';
import { IconComponent } from '../../general/icon/icon.component';
import { SidebarStatusService } from '../../../services/sidebar-status.service';
import { NotificationsDirective } from '../../directives/notifications.directive';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';

// Configuration
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    TranslateModule,
    IconComponent,
    DropdownComponent,
  ],
  templateUrl: './admin-dashboard-layout.component.html',
  styleUrl: '../../../../assets/styles/admin/_main.scss',
  encapsulation: ViewEncapsulation.None,
})

// Logic
export class AdminDashboardLayoutComponent {
  // Site name and url
  siteName = environment.siteName;
  siteUrl = environment.siteUrl;

  // Sidebar Status
  sidebarStatus!: boolean;

  // Reference for component destroy
  destroyRef = inject(DestroyRef);

  // User data for dropdown content
  dropdownButton: SafeHtml = '';

  // Default member icon
  memberIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
  </svg>`;

  // Items for dropdown menu in sidebar
  dropdownItems!: Array<UiDropdown>;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly translateService: TranslateService,
    private readonly sidebarStatusService: SidebarStatusService,
    private readonly notificationsDirective: NotificationsDirective,
  ) {
    // Get the current sidebar
    this.sidebarStatus = this.sidebarStatusService.sidebarStatus;

    // Create dropdown button content
    const dropdownButton = `
    <ng-template #dynamicContent>
      <div class="flex pc-user-picture">
        <span class="pc-user-picture-cover">
          ${this.memberIcon}
        </span>
        <div class="ml-3">
          <p class="text-sm">Ruslan Sirbu</p>
          <p class="text-sm">administrator</p>
        </div>
      </div>
    </ng-template>
    <ng-container *ngTemplateOutlet="dynamicContent"></ng-container>`;

    // Set dropdown button content
    this.dropdownButton =
      this.sanitizer.bypassSecurityTrustHtml(dropdownButton);
  }

  // Maximize or minimize the sidebar in the dashboard
  showHideSidebar() {
    // Change the sidebar status
    this.sidebarStatus = !this.sidebarStatus;

    // Change the sidebar status
    const observable = this.sidebarStatusService.changeStatus({
      sidebar: this.sidebarStatus ? 1 : 0,
    });

    // Subscribe to the changes
    observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data: { success: boolean; message: string }) => {
        // Verify if the changes weren't saved successfully
        if (!data.success) {
          this.notificationsDirective.showNotification('error', data.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  translateText(text: string): string {
    return this.translateService.instant(text);
  }
}
