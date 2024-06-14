// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Installed Utils
import { TranslateModule } from '@ngx-translate/core';

// App Utils
import { NotificationsDirective } from '../../../../shared/directives/notifications.directive';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockNotificationsService: jasmine.SpyObj<NotificationsDirective>;

  beforeEach(async () => {
    mockNotificationsService = jasmine.createSpyObj('NotificationsService', ['showNotification']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        UsersComponent,
        NotificationsDirective
      ],
      providers: [
        { provide: NotificationsDirective, useValue: mockNotificationsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
