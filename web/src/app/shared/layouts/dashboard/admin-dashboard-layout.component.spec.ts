// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';

// App Utils
import { NotificationsDirective } from '../../directives/notifications.directive';
import { AdminDashboardLayoutComponent } from './admin-dashboard-layout.component';

// Test the Dashboard Layout
describe('DashboardLayoutComponent', () => {
  let component: AdminDashboardLayoutComponent;
  let fixture: ComponentFixture<AdminDashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        AdminDashboardLayoutComponent,
      ],
      providers: [NotificationsDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
