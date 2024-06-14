// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../assets/i18n/en.json';
import { AuthLayoutComponent } from './auth-layout.component';

// Test the AuthLayoutComponent
describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        AuthLayoutComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('checking if the component instance exists', () => {
    expect(component).toBeTruthy();
  });

  it('should load all elements', () => {
    expect(
      fixture.nativeElement.querySelector('.pc-auth-container'),
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.max-w-md')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.grid')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.col-1')).toBeTruthy();
  });
});
