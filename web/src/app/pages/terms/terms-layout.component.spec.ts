// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../assets/i18n/en.json';
import { TermsLayoutComponent } from './terms-layout.component';

// Test the TermsLayoutComponent
describe('TermsLayoutComponent', () => {
  let component: TermsLayoutComponent;
  let fixture: ComponentFixture<TermsLayoutComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        TermsLayoutComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the child app-top-bar-min', () => {
    expect(fixture.nativeElement.querySelector('app-top-bar-min')).toBeTruthy();
  });

  it('should contain the child app-footer', () => {
    expect(fixture.nativeElement.querySelector('app-footer')).toBeTruthy();
  })

  it('should contain the class pc-terms', () => {
    expect(fixture.nativeElement.querySelector('.pc-terms')).toBeTruthy();
  });

});
