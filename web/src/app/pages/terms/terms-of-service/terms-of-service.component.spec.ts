// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MarkdownModule } from 'ngx-markdown';

// App Utils
import en from '../../../../assets/i18n/en.json';
import { TermsOfServiceComponent } from './terms-of-service.component';

// Test the TermsOfServiceComponent
describe('TermsOfServiceComponent', () => {
  let component: TermsOfServiceComponent;
  let fixture: ComponentFixture<TermsOfServiceComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TermsOfServiceComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        MarkdownModule.forRoot(),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the child app-terms-layout', () => {
    expect(fixture.nativeElement.querySelector('app-terms-layout')).toBeTruthy();
  });

  it('should contain the markdown', () => {
    expect(fixture.nativeElement.querySelector('markdown')).toBeTruthy();
  });
});
