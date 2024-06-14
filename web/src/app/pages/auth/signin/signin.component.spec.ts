// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../assets/i18n/en.json';
import { SigninComponent } from './signin.component';

// Test the SigninComponent
describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        SigninComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        RouterModule.forRoot([]),
        HttpClientModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should load image childrens', () => {
    expect(fixture.nativeElement.querySelectorAll('app-icon').length).toBe(2);
  });

  it('should load app-auth-layout children', () => {
    expect(fixture.nativeElement.querySelector('app-auth-layout')).toBeTruthy();
  });

  it('should load all elements', () => {
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });
});
