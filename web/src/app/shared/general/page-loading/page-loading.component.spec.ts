// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../assets/i18n/en.json';
import { PageLoadingComponent } from './page-loading.component';

// Test the PageLoadingComponent
describe('PageLoadingComponent', () => {
  let component: PageLoadingComponent;
  let fixture: ComponentFixture<PageLoadingComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        PageLoadingComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLoadingComponent);
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
    expect(fixture.nativeElement.querySelector('.pc-page-loading')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-loading-container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-loading-circle')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-loading-circle-box-complete')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-loading-circle-fill')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-loading-text')).toBeTruthy();
  });
});
