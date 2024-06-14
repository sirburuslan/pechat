// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../../assets/i18n/en.json';
import { PlansComponent } from './plans.component';

// Test the PlansComponent
describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        PlansComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should load the elements', () => {
    expect(fixture.nativeElement.querySelector('.pc-plans')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-plans-container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.w-full')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-plans-list')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.flex')).toBeTruthy();
  });
});
