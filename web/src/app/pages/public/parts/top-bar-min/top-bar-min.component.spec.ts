// System Utils
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

// Installed Utils
import { TranslateTestingModule } from 'ngx-translate-testing';

// App Utils
import en from '../../../../../assets/i18n/en.json';
import { TopBarMinComponent } from './top-bar-min.component';

// Test the TopBarMinComponent
describe('TopBarMinComponent', () => {
  let component: TopBarMinComponent;
  let fixture: ComponentFixture<TopBarMinComponent>;

  beforeAll(async () => {
    const translations = en as never;
    await TestBed.configureTestingModule({
      imports: [
        TopBarMinComponent,
        TranslateTestingModule.withTranslations({
          en: translations,
        }),
        RouterModule.forRoot([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create the component session', () => {
    expect(component).toBeTruthy();
  });

  it('should load correctly all elements', () => {
    expect(fixture.nativeElement.querySelector('.pc-top-bar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-top-bar-container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-top-bar-logo')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-top-bar-menu')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-top-bar-auth')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-auth-sign-in')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.pc-auth-sign-up')).toBeTruthy();
  });
});
