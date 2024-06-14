// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../../assets/i18n/en.json';
import { StatsComponent } from './stats.component';

// Test the StatsComponent
describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        StatsComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the icon child', () => {
    expect(fixture.nativeElement.querySelector('app-icon')).toBeTruthy();
  });

  it('should load correctly the elements', () => {
    expect(fixture.nativeElement.querySelector('.pc-stats')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-stats-container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-stat')).toBeTruthy();
  });
});
