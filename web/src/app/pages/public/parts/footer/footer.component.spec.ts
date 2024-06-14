// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../../assets/i18n/en.json';
import { FooterComponent } from './footer.component';

// Test the FooterComponent
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        FooterComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should load elements', () => {
    expect(fixture.nativeElement.querySelector('.pc-footer')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-footer-container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-footer-terms-links')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-footer-social-links')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bi-facebook')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bi-whatsapp')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bi-twitter-x')).toBeTruthy();
  });

  it('should load 5 links', () => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toBe(5);
  });
});
