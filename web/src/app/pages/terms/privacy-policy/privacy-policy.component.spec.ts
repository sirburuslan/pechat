// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MarkdownModule } from 'ngx-markdown';

// App Utils
import en from '../../../../assets/i18n/en.json';
import { PrivacyPolicyComponent } from './privacy-policy.component';

// Test the PrivacyPolicyComponent
describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: ComponentFixture<PrivacyPolicyComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        PrivacyPolicyComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        MarkdownModule.forRoot(),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the child app-terms-layout', () => {
    expect(fixture.nativeElement.querySelector('app-terms-layout')).toBeTruthy();
  });

  it('should contain the markdown', () => {
    expect(fixture.nativeElement.querySelector('markdown')).toBeTruthy();
  });
});
