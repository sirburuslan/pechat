// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../../assets/i18n/en.json';
import { PresentationComponent } from './presentation.component';

// Test the PresentationComponent
describe('PresentationComponent', () => {
  let component: PresentationComponent;
  let fixture: ComponentFixture<PresentationComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        PresentationComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should load the icon component child', () => {
    expect(fixture.nativeElement.querySelectorAll('app-icon').length).toBe(2);
  });

  it('shoul load correctly the elements', () => {
    expect(fixture.nativeElement.querySelector('.pc-presentation')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-presentation-container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-presentation-text')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-get-started')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-book-call')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-presentation-image')).toBeTruthy();
  });
});
