// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../../assets/i18n/en.json';
import { FaqComponent } from './faq.component';

// The the FaqComponent
describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        FaqComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should load all elements', () => {
    expect(fixture.nativeElement.querySelector('.pc-faq')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-faq-container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.w-full')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-faq-answer')).toBeTruthy();
  });

  it('should load all icon childrens', () => {
    expect(fixture.nativeElement.querySelectorAll('app-icon').length).toBe(7);
  });
});
