// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../../assets/i18n/en.json';
import { FeaturesComponent } from './features.component';

// Test the FeaturesComponent
describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        FeaturesComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
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
    expect(fixture.nativeElement.querySelector('.pc-features')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-features-container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.w-full')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-features-list')).toBeTruthy();
  });

  it('should load 8 icon childrens', () => {
    expect(fixture.nativeElement.querySelectorAll('app-icon').length).toBe(8);
  });
});
