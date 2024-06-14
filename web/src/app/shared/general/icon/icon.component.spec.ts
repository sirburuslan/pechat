// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../assets/i18n/en.json';
import { IconComponent } from './icon.component';

// Test the IconComponent
describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        IconComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconComponent);
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
    expect(fixture.nativeElement.querySelector('.material-icons-outlined')).toBeTruthy();
  });
});
